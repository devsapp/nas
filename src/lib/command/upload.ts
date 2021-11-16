import { spinner, zip } from '@serverless-devs/core';
import path from 'path';
import async from 'async';
import _ from 'lodash';
import rimraf from 'rimraf';
import md5File from 'md5-file';
import fs from 'fs-extra';
import { ICommandProps } from '../../interface';
import { resolveLocalPath } from '../utils/utils';
import { getFileStat, splitRangeBySize } from '../utils/file';
import readDirRecursive, { chunk } from '../utils/read-dir-recursive';
import CommandBase from './command-base';
import logger from '../../common/logger';

interface IApts {
  localDir: string;
  fcDir: string;
  recursive: boolean;
  noClobber: boolean;
}

interface IDstStats {
  dstPath: string;
  dstPathEndWithSlash: boolean;
  dstPathExists: boolean;
  parentDirOfDstPathExists: boolean;
  dstPathIsDir: boolean;
  dstPathIsFile: boolean;
}

export default class Upload extends CommandBase {
  async cpFromLocalToNas(props: ICommandProps, apts: IApts) {
    const { serviceName, userId = 10003, groupId = 10003 } = props;
    const { localDir, fcDir, recursive, noClobber } = apts;
    const localResolvedSrc = resolveLocalPath(localDir);
    const localFileStat = await getFileStat(localResolvedSrc);
    if (!localFileStat) {
      throw new Error(`${localResolvedSrc} is not a file or directory`);
    }
    const isDirectory = localFileStat.isDirectory();
    if (isDirectory && !recursive) {
      throw new Error('Can not copy folder without option -r/--recursive');
    }

    const { data: stats } = await super.callStats(serviceName, fcDir);
    const dstStats: IDstStats = {
      dstPath: fcDir,
      dstPathEndWithSlash: fcDir.endsWith('/'),
      dstPathExists: stats.exists,
      parentDirOfDstPathExists: stats.parentDirExists,
      dstPathIsDir: stats.isDir,
      dstPathIsFile: stats.isFile,
    };
    logger.debug(`dstStats value is: ${JSON.stringify(dstStats)}`);
    const actualDstPath = await this.checkUploadDstPath(
      serviceName,
      localResolvedSrc,
      dstStats,
      noClobber,
      isDirectory,
    );
    const permTip = this.checkWritePerm(stats, userId, groupId, fcDir);
    if (permTip) {
      logger.error(`Warning: ${permTip}`);
    }

    if (isDirectory) {
      await this.uploadFolder(
        localResolvedSrc,
        actualDstPath,
        serviceName,
        noClobber,
      );
    } else if (localFileStat.isFile()) {
      await this.uploadFile(localResolvedSrc, actualDstPath, serviceName);
    } else {
      throw new Error(`${localResolvedSrc} has the same file stat and folder stat`);
    }
  }

  /**
   * 上传文件夹
   * @param localResolvedSrc 本地代码包地址
   * @param actualDstPath 目标地址
   * @param serviceName 主函数的服务名称
   * @param noClobber 不覆盖
   */
  async uploadFolder(
    localResolvedSrc: string,
    actualDstPath: string,
    serviceName: string,
    noClobber: boolean,
  ) {
    const outputFileName = `${path.basename(path.resolve(localResolvedSrc))}.zip`;
    const outputFilePath = path.join(process.cwd(), '.s', 'zip');
    const excludes = [path.join('.s', 'zip'), '.DS_Store'];
    await zip({
      codeUri: localResolvedSrc,
      outputFileName,
      outputFilePath,
      exclude: excludes,
    });

    logger.debug(`Checking NAS tmp dir ${actualDstPath}`);
    const tmpCheck = await super.callTmpCheck(serviceName, actualDstPath);
    logger.debug(`Tmp check response is: ${JSON.stringify(tmpCheck)}`);

    const nasZipFilePath = path.posix.join(actualDstPath, outputFileName);
    const localZipFilePath = path.posix.join(outputFilePath, outputFileName);
    await this.uploadFile(localZipFilePath, nasZipFilePath, serviceName);

    const unZippingVm = spinner(`unzipping file: ${nasZipFilePath}`);
    const srcPathFiles = await readDirRecursive(localResolvedSrc, excludes);
    await this.unzipNasFileParallel(
      serviceName,
      actualDstPath,
      nasZipFilePath,
      chunk(srcPathFiles, 248),
      noClobber,
      unZippingVm,
    );

    logger.debug('cleaning');
    await super.callClean(serviceName, nasZipFilePath);
    logger.debug("'✔' clean done");

    rimraf.sync(localZipFilePath);
    logger.debug("'✔'  upload completed!");
  }

  /**
   * 上传文件
   * @param localResolvedSrc 本地代码包地址
   * @param actualDstPath 目标地址
   * @param serviceName 主函数的服务名称
   * @param fileHash 文件hash值
   */
  private async uploadFile(
    localResolvedSrc: string,
    actualDstPath: string,
    serviceName: string,
    fileHash?: string,
  ) {
    const stat = await fs.lstat(localResolvedSrc);
    const createFileCmd = `dd if=/dev/zero of=${actualDstPath} count=0 bs=1 seek=${stat.size}`;
    logger.debug(`Upload url is ${serviceName}, cmd is '${createFileCmd}'`);
    // 文件切片
    const fileOffSetCutByChunkSize = splitRangeBySize(0, stat.size);
    if (!fileHash) {
      fileHash = await md5File(localResolvedSrc);
    }
    // 创建文件
    const createVm = spinner(`Create file: ${actualDstPath}\n`);
    const { data } = await super.callCommands(serviceName, createFileCmd);
    logger.debug(JSON.stringify(data));
    if (data.error) {
      createVm.fail();
      logger.log('');
      throw new Error(data.error);
    }
    createVm.stop();
    // 分片上传
    await this.uploadFileByChunk(
      serviceName,
      actualDstPath,
      localResolvedSrc,
      fileOffSetCutByChunkSize,
    );

    // 修改文件权限
    const filePermission = `0${ (stat.mode & parseInt('777', 8)).toString(8)}`;
    const cmd = `chmod ${filePermission} ${actualDstPath}`;
    logger.debug(`update file permission: ${cmd}`);
    const permissionRes = await super.callCommands(serviceName, cmd);
    logger.debug(`update file permission: ${JSON.stringify(permissionRes)}`);
    // 检测文件 hash 值
    logger.debug(`checking uploaded file ${actualDstPath} hash`);
    const checkRes = await super.callFileCheck(serviceName, actualDstPath, fileHash);
    logger.debug(JSON.stringify(checkRes?.data || ''));
    logger.debug("'✔' hash unchanged");
  }

  /**
   * 解压 nas 的文件
   * @param serviceName 主函数的服务名称
   * @param dstDir 解压的目标地址
   * @param nasZipFile 解压的文件地址
   * @param filesArrQueue 解压的队列
   * @param noClobber 是否覆盖
   * @returns Promise<viod>
   */
  private unzipNasFileParallel(
    serviceName: string,
    dstDir: string,
    nasZipFile: string,
    filesArrQueue: any[],
    noClobber: boolean,
    unZippingVm: any,
  ) {
    return new Promise((resolve) => {
      const unzipQueue = async.queue(async (unzipFiles, next) => {
        try {
          let cmd = `unzip -q ${noClobber ? '-n' : '-o'} ${nasZipFile} -d ${dstDir}`;
          for (const unzipFile of unzipFiles) {
            cmd += ` '${unzipFile}'`;
          }
          logger.debug(`Send unzip request cmd is: ${cmd}.`);
          const res = await super.callCommands(serviceName, _.escapeRegExp(cmd));
          logger.debug(JSON.stringify(res));
        } catch (error) {
          // zip 中存在特殊文件名，例如 $data.js，或者没有权限
          if (error.message && (error.message?.includes('filename not matched') || error.message.toLowerCase()?.includes('permission denied'))) {
            unZippingVm.fail();
            return logger.error(`Unzipping file error: ${error.code || ''} ${error.message}`);
          }

          logger.debug(`${error.code || ''} ${error.message.toLowerCase()}`);

          // 当解压文件数大于 1 ，默认为解压文件数过多导致 unzip 指令超出指令长度限制导致的解压失败
          // 会将解压文件列表折半拆分后进行重试
          if (unzipFiles.length > 1) {
            logger.log('Retry unziping...');
            const retryUnzipFiles = [];
            retryUnzipFiles.push(unzipFiles.slice(0, unzipFiles.length / 2));
            retryUnzipFiles.push(unzipFiles.slice(unzipFiles.length / 2, unzipFiles.length));
            unzipQueue.unshift(retryUnzipFiles);
          } else {
            // 解压文件数小于 1 个时，认为不是解压文件数过多造成的问题
            // 因此提示用户重新上传
            logger.error(error);
            logger.error('Unzip error! Please re-sync.');
            return;
          }
        }
        next();
      }, 5);

      unzipQueue.drain(() => {
        unZippingVm.stop();
        resolve('');
      });
      unzipQueue.push(filesArrQueue);
    });
  }

  /**
   * 按块上传文件
   * @param serviceName 服务名称，用于计算辅助函数的 http 地址
   * @param nasZipFile 上传到 nas 的文件名称
   * @param zipFilePath 本地的压缩包
   * @param fileOffSet 计算的切片
   * @returns void
   */
  private uploadFileByChunk(
    serviceName: string,
    nasZipFile: string,
    zipFilePath: string,
    fileOffSet: any[],
  ) {
    return new Promise((resolve) => {
      const vm = spinner('Uploading file to nas');
      const uploadQueue = async.queue(async (offSet, callback) => {
        try {
          const { start, size } = offSet;
          const urlPath = super.getChunkFileUploadReqPath(serviceName);

          // 读取文件内容
          const fd = await fs.open(zipFilePath, 'r');
          const body = Buffer.alloc(size);
          const { bytesRead } = await fs.read(fd, body, 0, size, start);
          if (bytesRead !== size) {
            throw new Error('ReadChunkFile function bytesRead not equal read size');
          }
          await fs.close(fd);

          const query = { nasFile: nasZipFile, fileStart: start.toString() };
          const res = await this.fcClient.post(urlPath, body, {}, query);
          logger.debug(`Call ${urlPath} query is: ${JSON.stringify(query)}, response is: ${JSON.stringify(res)}`);
          if (res.data.error) {
            throw new Error(res.data.error);
          }
        } catch (error) {
          logger.error(`upload error : ${error.message}`);
          logger.debug(error.stack);
          vm.fail();
          // TODO：RETRY
          return;
        }
        callback();
      }, 5);

      uploadQueue.drain(() => {
        vm.succeed('Upload done');
        resolve('');
      });
      uploadQueue.push(fileOffSet);
    });
  }

  /**
   * 检测上传地址可用性
   */
  private async checkUploadDstPath(
    serviceName: string,
    localFilePath: string,
    dstStats: IDstStats,
    noClobber: boolean, // 不覆盖
    isDirectory: boolean, // 本地是否是文件夹
  ) {
    const {
      dstPath, // 远端目录
      dstPathExists, // 远端已经存在
      parentDirOfDstPathExists, // 远端父级目录存在
      dstPathIsDir, // 远端是个目录
      dstPathIsFile, // 远端是个文件
      dstPathEndWithSlash, // 斜线结尾
    } = dstStats;
    const localPathEndWithSlash = localFilePath.endsWith('/');
    const newDstPath = path.posix.join(dstPath, path.basename(localFilePath));

    const localDirButDstFileError = `nas upload: ${newDstPath}: Not a directory`;
    const localFileButDstDirError = `cannot overwrite directory ${newDstPath} with non-directory ${localFilePath}`;
    const localFileAndDstNotExistError = `nas upload: directory ${dstPath} does not exist`;
    const dstParentPathNotExistAndDstNotExistError = `nas upload: cannot create directory ${dstPath}: No such file or directory`;

    // 如果本地是文件夹，远端是文件
    if (dstPathIsFile && isDirectory) {
      throw new Error(localDirButDstFileError);
    }

    // 远端地址已经存在
    if (dstPathExists) {
      if (isDirectory) {
        // 如果本地是文件夹并且不以 / 结尾，上传`当前目录下`所有的文件到远端地址
        if (localPathEndWithSlash) {
          return dstPath;
        }

        // 重新 check newDstPath 是否在远端存在
        const { data: stats } = await super.callStats(serviceName, newDstPath);
        if (!stats.exists || stats.isDir) {
          return newDstPath;
        }
        throw new Error(localDirButDstFileError);
      }
      // 如果本地不是文件夹，check 新的目标地址
      if (dstPathIsDir) {
        const { data: stats } = await super.callStats(serviceName, newDstPath);
        if (stats.isFile && noClobber) {
          throw new Error(`${newDstPath} already exists`);
        }
        if (!stats.exists || stats.isFile) {
          return newDstPath;
        }
        throw new Error(localFileButDstDirError);
      }
      if (noClobber) throw new Error(`${dstPath} already exists`);
      return dstPath;
    }
    // 远端地址不存在
    if (!parentDirOfDstPathExists) {
      throw new Error(dstParentPathNotExistAndDstNotExistError); // 父目录不存在
    }
    if (isDirectory) {
      return dstPath; // 需要上传的是文件夹
    }
    if (dstPathEndWithSlash) {
      throw new Error(localFileAndDstNotExistError); // 需要上传的是文件，远端以斜线结尾
    }
    return dstPath; // 本地是文件
  }

  /**
   * 检测上传地址是否可写
   */
  private checkWritePerm(stats: any, userId: number, groupId: number, fcDir: string): string | undefined {
    if (!stats.exists) return undefined;

    const {
      mode,
      UserId: nasPathUserId,
      GroupId: nasPathGroupId,
    } = stats;

    if (nasPathUserId === 0 && nasPathGroupId === 0) {
      return undefined;
    }

    // permStirng 为 ‘777’ 形式的权限形式
    const permString = (mode & parseInt('777', 8)).toString(8);
    const [ownerCanWrite, groupCanWrite, otherCanWrite] = _.map(permString, (perm) => {
      const num = parseInt(perm, 10);
      if (stats.isDir && !stats.isFile) {
        // -wx, num | 100 === 7
        return (num | 4) === 7;
      } else if (stats.isFile && !stats.isDir) {
        // -w-, num | 101
        return (num | 5) === 7;
      } else if (stats.isFile && stats.isDir) {
        throw new Error(`isFile and isDir attributes of ${fcDir} are true simultaneously`);
      }
    });

    const moreInformation = 'more information please refer to https://github.com/devsapp/fc/issues/319';

    if (!ownerCanWrite && !groupCanWrite && !otherCanWrite) {
      return `${fcDir} has no '-w-' or '-wx' permission, ${moreInformation}`;
    } else if (ownerCanWrite && groupCanWrite && otherCanWrite) {
      return undefined;
    } else if (
      userId === nasPathUserId &&
      !ownerCanWrite &&
      groupId === nasPathGroupId &&
      !groupCanWrite &&
      otherCanWrite
    ) {
      return `UserId: ${nasPathUserId} and GroupId: ${nasPathGroupId} have no '-w-' or '-wx' permission to ${fcDir}, which may cause permission problem, \
      ${moreInformation}`;
    } else if (
      !((userId === nasPathUserId && ownerCanWrite) || (groupId === nasPathGroupId && groupCanWrite))
    ) {
      return `UserId: ${userId} and GroupId: ${groupId} in your NasConfig are mismatched with UserId: ${nasPathUserId} and GroupId: ${nasPathGroupId} of ${fcDir}, \
  which may cause permission problem,${moreInformation}`;
    }
    return undefined;
  }
}

