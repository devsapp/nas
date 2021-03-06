import * as core from '@serverless-devs/core';
import path from 'path';
import async from 'async';
import _ from 'lodash';
import md5File from 'md5-file';
import { ICommandProps } from '../../interface';
import { resolveLocalPath } from '../utils/utils';
import { getFileStat, splitRangeBySize } from '../utils/file';
import readDirRecursive, { chunk } from '../utils/read-dir-recursive';
import CommandBase from './command-base';
import logger from '../../common/logger';

const { spinner, zip, fse: fs, rimraf } = core;

interface IApts {
  localDir: string;
  fcDir: string;
  recursive: boolean;
  override: boolean;
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
    const { localDir, fcDir, recursive, override } = apts;
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
      override,
      isDirectory,
    );
    const permTip = this.checkWritePerm(stats, userId, groupId, fcDir);
    if (permTip) {
      logger.error(`Warning: ${permTip}`);
    }

    if (isDirectory) {
      await this.uploadFolder(localResolvedSrc, actualDstPath, serviceName, override);
    } else if (localFileStat.isFile()) {
      await this.uploadFile(localResolvedSrc, actualDstPath, serviceName);
    } else {
      throw new Error(`${localResolvedSrc} has the same file stat and folder stat`);
    }
  }

  /**
   * ???????????????
   * @param localResolvedSrc ?????????????????????
   * @param actualDstPath ????????????
   * @param serviceName ????????????????????????
   * @param override ??????
   */
  async uploadFolder(
    localResolvedSrc: string,
    actualDstPath: string,
    serviceName: string,
    override: boolean,
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
      override,
      unZippingVm,
    );

    logger.debug('cleaning');
    await super.callClean(serviceName, nasZipFilePath);
    logger.debug("'???' clean done");

    rimraf.sync(localZipFilePath);
    logger.debug("'???'  upload completed!");
  }

  /**
   * ????????????
   * @param localResolvedSrc ?????????????????????
   * @param actualDstPath ????????????
   * @param serviceName ????????????????????????
   * @param fileHash ??????hash???
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
    // ????????????
    const fileOffSetCutByChunkSize = splitRangeBySize(0, stat.size);
    if (!fileHash) {
      fileHash = await md5File(localResolvedSrc);
    }
    // ????????????
    const createVm = spinner(`Create file: ${actualDstPath}\n`);
    const { data } = await super.callCommands(serviceName, createFileCmd);
    logger.debug(`createFile res: ${JSON.stringify(data)}`);
    if (data.error) {
      createVm?.fail();
      logger.log('');
      throw new Error(data.error);
    }

    createVm?.stop();
    // ????????????
    await this.uploadFileByChunk(
      serviceName,
      actualDstPath,
      localResolvedSrc,
      fileOffSetCutByChunkSize,
    );

    // ??????????????????
    const filePermission = `0${(stat.mode & parseInt('777', 8)).toString(8)}`;
    const cmd = `chmod ${filePermission} ${actualDstPath}`;
    logger.debug(`update file permission: ${cmd}`);
    const permissionRes = await super.callCommands(serviceName, cmd);
    logger.debug(`update file permission: ${JSON.stringify(permissionRes)}`);
    // ???????????? hash ???
    logger.debug(`checking uploaded file ${actualDstPath} hash`);
    const checkRes = await super.callFileCheck(serviceName, actualDstPath, fileHash);
    logger.debug(JSON.stringify(checkRes?.data || ''));
    logger.debug("'???' hash unchanged");
  }

  /**
   * ?????? nas ?????????
   * @param serviceName ????????????????????????
   * @param dstDir ?????????????????????
   * @param nasZipFile ?????????????????????
   * @param filesArrQueue ???????????????
   * @param override ????????????
   * @returns Promise<viod>
   */
  private unzipNasFileParallel(
    serviceName: string,
    dstDir: string,
    nasZipFile: string,
    filesArrQueue: any[],
    override: boolean,
    unZippingVm: any,
  ) {
    return new Promise((resolve) => {
      const unzipQueue = async.queue(async (unzipFiles, next) => {
        try {
          let cmd = `unzip -q ${override ? '-o' : '-n'} ${nasZipFile} -d ${dstDir}`;
          for (const unzipFile of unzipFiles) {
            cmd += ` '${unzipFile}'`;
          }
          logger.debug(`Send unzip request cmd is: ${cmd}.`);
          const res = await super.callCommands(serviceName, _.escapeRegExp(cmd));
          logger.debug(JSON.stringify(res));
        } catch (error) {
          // zip ????????????????????????????????? $data.js?????????????????????
          if (
            error.message &&
            (error.message?.includes('filename not matched') ||
              error.message.toLowerCase()?.includes('permission denied'))
          ) {
            unZippingVm?.fail();
            return logger.error(`Unzipping file error: ${error.code || ''} ${error.message}`);
          }

          logger.debug(`${error.code || ''} ${error.message.toLowerCase()}`);

          // ???????????????????????? 1 ??????????????????????????????????????? unzip ???????????????????????????????????????????????????
          // ???????????????????????????????????????????????????
          if (unzipFiles.length > 1) {
            logger.log('Retry unziping...');
            const retryUnzipFiles = [];
            retryUnzipFiles.push(unzipFiles.slice(0, unzipFiles.length / 2));
            retryUnzipFiles.push(unzipFiles.slice(unzipFiles.length / 2, unzipFiles.length));
            unzipQueue.unshift(retryUnzipFiles);
          } else {
            // ????????????????????? 1 ?????????????????????????????????????????????????????????
            // ??????????????????????????????
            logger.error(error);
            logger.error('Unzip error! Please re-sync.');
            return;
          }
        }
        next();
      }, 5);

      unzipQueue.drain(() => {
        unZippingVm?.stop();
        resolve('');
      });
      unzipQueue.push(filesArrQueue);
    });
  }

  /**
   * ??????????????????
   * @param serviceName ?????????????????????????????????????????? http ??????
   * @param nasZipFile ????????? nas ???????????????
   * @param zipFilePath ??????????????????
   * @param fileOffSet ???????????????
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
          await super.callCommands(serviceName, 'ls -al /mnt/auto/');
        } catch (_ex) { }

        try {
          const { start, size } = offSet;
          const urlPath = super.getChunkFileUploadReqPath(serviceName);

          // ??????????????????
          const fd = await fs.open(zipFilePath, 'r');
          const body = Buffer.alloc(size);
          const { bytesRead } = await fs.read(fd, body, 0, size, start);
          if (bytesRead !== size) {
            throw new Error('ReadChunkFile function bytesRead not equal read size');
          }
          await fs.close(fd);

          const query = { nasFile: nasZipFile, fileStart: start.toString() };
          const res = await this.fcClient.post(urlPath, body, {}, query);
          logger.debug(
            `Call ${urlPath} query is: ${JSON.stringify(query)}, response is: ${JSON.stringify(
              res,
            )}`,
          );
          if (res.data.error) {
            throw new Error(res.data.error);
          }
        } catch (error) {
          logger.error(`upload error ${error.code}-${error.status}: ${error.message}`);
          logger.debug(error.stack);
          vm?.fail();
          // TODO???RETRY
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
   * ???????????????????????????
   */
  private async checkUploadDstPath(
    serviceName: string,
    localFilePath: string,
    dstStats: IDstStats,
    override: boolean, // ??????
    isDirectory: boolean, // ????????????????????????
  ) {
    const {
      dstPath, // ????????????
      dstPathExists, // ??????????????????
      parentDirOfDstPathExists, // ????????????????????????
      dstPathIsDir, // ??????????????????
      dstPathIsFile, // ??????????????????
      dstPathEndWithSlash, // ????????????
    } = dstStats;
    const newDstPath = path.posix.join(dstPath, path.basename(localFilePath));

    const localDirButDstFileError = `nas upload: ${newDstPath}: Not a directory`;
    const localFileButDstDirError = `cannot overwrite directory ${newDstPath} with non-directory ${localFilePath}`;
    const localFileAndDstNotExistError = `nas upload: directory ${dstPath} does not exist`;
    const dstParentPathNotExistAndDstNotExistError = `nas upload: cannot create directory ${dstPath}: No such file or directory`;

    // ??????????????????????????????????????????
    if (dstPathIsFile && isDirectory) {
      throw new Error(localDirButDstFileError);
    }

    // ????????????????????????
    if (dstPathExists) {
      if (isDirectory) {
        // ??????????????????????????????`???????????????`??????????????????????????????
        return dstPath;
      }
      // ??????????????????????????????check ??????????????????
      if (dstPathIsDir) {
        const { data: stats } = await super.callStats(serviceName, newDstPath);
        if (stats.isFile && !override) {
          throw new Error(`${newDstPath} already exists`);
        }
        if (!stats.exists || stats.isFile) {
          return newDstPath;
        }
        throw new Error(localFileButDstDirError);
      }
      if (!override) throw new Error(`${dstPath} already exists`);
      return dstPath;
    }
    // ?????????????????????
    if (!parentDirOfDstPathExists) {
      throw new Error(dstParentPathNotExistAndDstNotExistError); // ??????????????????
    }
    if (isDirectory) {
      return dstPath; // ???????????????????????????
    }
    if (dstPathEndWithSlash) {
      throw new Error(localFileAndDstNotExistError); // ????????????????????????????????????????????????
    }
    return dstPath; // ???????????????
  }

  /**
   * ??????????????????????????????
   */
  private checkWritePerm(
    stats: any,
    userId: number,
    groupId: number,
    fcDir: string,
  ): string | undefined {
    if (!stats.exists) return undefined;

    const { mode, UserId: nasPathUserId, GroupId: nasPathGroupId } = stats;

    if (nasPathUserId === 0 && nasPathGroupId === 0) {
      return undefined;
    }

    // permStirng ??? ???777??? ?????????????????????
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

    const moreInformation =
      'more information please refer to https://github.com/devsapp/fc/issues/319';

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
      !(
        (userId === nasPathUserId && ownerCanWrite) ||
        (groupId === nasPathGroupId && groupCanWrite)
      )
    ) {
      return `UserId: ${userId} and GroupId: ${groupId} in your NasConfig are mismatched with UserId: ${nasPathUserId} and GroupId: ${nasPathGroupId} of ${fcDir}, \
  which may cause permission problem,${moreInformation}`;
    }
    return undefined;
  }
}
