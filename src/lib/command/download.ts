import * as core from '@serverless-devs/core';
import path from 'path';
import CommandBase from './command-base';
import { ICommandProps } from '../../interface';
import logger from '../../common/logger';
import { getFileStat, splitRangeBySize } from '../utils/file';

const { spinner, unzip, fse: fs } = core;
interface IApts {
  localDir: string;
  fcDir: string;
  noUnzip: boolean;
  override: boolean;
}

export default class Download extends CommandBase {
  async cpFromNasToLocal(props: ICommandProps, apts: IApts, configPath: string) {
    const { serviceName } = props;
    const { localDir, fcDir, override, noUnzip } = apts;

    logger.info(`Checking remote file ${fcDir} exists`);
    const { data: stat } = await super.callStats(serviceName, fcDir);
    logger.debug(`stats::\n${JSON.stringify(stat, null, 2)}`);
    if (!stat.exists) {
      throw new Error(`${fcDir} is not exsit.`);
    }

    if (stat.isDir) {
      return await this.downloadDir(serviceName, fcDir, localDir, configPath, override, noUnzip);
    }

    const dir = path.dirname(localDir);
    const fileName = path.basename(localDir);
    await this.downloadFile(serviceName, stat, dir, fileName, override);
  }

  /**
   * 下载文件夹
   * @param serviceName 服务名称
   * @param stat 远端文件的信息
   * @param fcDir 远端文件路径
   * @param localDir 本地文件路径
   * @param override 强制覆盖文件
   * @param noUnzip 是否解压文件
   */
  private async downloadDir(serviceName: string, fcDir: string, localDir: string, configPath: string, override: boolean, noUnzip: boolean) {
    if (await getFileStat(localDir)) {
      if (!override) {
        logger.warn(`Your local file ${localDir} already exists, skip downloading`);
        return;
      }
    }
    // 将远端目录压缩成一个压缩包
    const zipVm = spinner(`zipping ${fcDir}`);
    const tmpNasZipPath = path.posix.join(path.dirname(fcDir), '.fun-nas-generated.zip');
    const cmd = `cd ${path.dirname(fcDir)} && rm -rf ${tmpNasZipPath} && zip -r ${tmpNasZipPath} ${path.basename(fcDir)}`;
    logger.debug(`zipping cmd: ${cmd}`);
    try {
      await super.callCommands(serviceName, cmd);
      zipVm.stop();
    } catch (e) {
      zipVm.fail();
      throw e;
    }

    // 获取远端压缩包的信息
    const { data: stat } = await super.callStats(serviceName, tmpNasZipPath);
    logger.debug(`.fun-nas-generated.zip stats::\n${JSON.stringify(stat, null, 2)}`);

    // 创建缓存目录
    logger.log('downloading...');
    const localZipDirname = path.join(configPath, '.s', 'nas');
    await fs.ensureDir(localZipDirname);
    // 下载文件
    const fileName = `fun-nas-generated-${path.basename(localDir)}.zip`;
    await this.downloadFile(serviceName, stat, localZipDirname, fileName, false);


    const localZipPath = path.join(localZipDirname, fileName);
    if (!noUnzip) {
      logger.log('unzipping file');
      await unzip(localZipPath, path.resolve(localDir)).then(() => {
        logger.log("'✔' unzip done!", 'green');
      });
      await fs.remove(localZipPath);
    } else {
      logger.log(`Download file path: ${localZipPath}`);
    }

    logger.debug(`send clean request ${fcDir} ${tmpNasZipPath}`);
    await super.callClean(serviceName, tmpNasZipPath);
    logger.log("'✔' download completed", 'green');
  }

  /**
   * 下载文件
   * @param serviceName 服务名称
   * @param stat 远端文件的信息
   * @param localDir 本地文件路径
   * @param fileName 本地文件名称
   * @param override 覆盖文件
   * @returns void
   */
  private async downloadFile(serviceName: string, stat: any, localDir: string, fileName: string, override: boolean) {
    const localFile = path.join(localDir, fileName);

    if (await getFileStat(localFile)) {
      if (!override) {
        logger.warn(`Your local file ${localFile} already exists, skip downloading`);
        return;
      }
      await fs.remove(localFile);
    }

    // 确保文件存在
    await fs.createFile(localFile);

    const fileSize = stat.size;
    // 文件切片
    const fileOffSetCutByChunkSize = splitRangeBySize(0, fileSize);
    logger.log(`file off set cut by chunk size length: ${fileOffSetCutByChunkSize.length}`);
    const downloadVm = spinner(`Download file ${0}/${fileSize}`);
    for (const { start, size } of fileOffSetCutByChunkSize) {
      downloadVm.text = `Download file ${start}/${fileSize}`;
      logger.debug(`start: ${start}, size: ${size}, url: ${stat.path}`);
      try {
        const { data } = await super.callDownload(serviceName, stat.path, start, size);
        await this.writeBufToFile(localFile, data, start);
      } catch (ex) {
        downloadVm.fail();
        throw ex;
      }
    }
    downloadVm.succeed('Download succeed');
  }

  private writeBufToFile(localFile, buf, start) {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(localFile, { start, flags: 'r+' });
      ws.write(buf);
      ws.end();
      ws.on('finish', () => resolve(''));
      ws.on('error', (error) => reject(error));
    });
  }
}
