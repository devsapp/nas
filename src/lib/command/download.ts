import fs from 'fs-extra';
import { unzip } from '@serverless-devs/core';
import path from 'path';
import CommandBase from './command-base';
import { ICommandProps } from '../../interface';
import logger from '../../common/logger';

interface IApts {
  localDir: string;
  fcDir: string;
  noUnzip: boolean;
  noClobber: boolean;
}

export default class Download extends CommandBase {
  async cpFromNasToLocal(props: ICommandProps, apts: IApts) {
    const { serviceName } = props;
    const { localDir, fcDir, noUnzip } = apts;
    await fs.mkdirs(localDir);

    logger.debug(`Check nas path ${fcDir} is exsit.`);
    const { data: checkNasPathExsit } = await super.callPathExsit(serviceName, fcDir);
    if (!checkNasPathExsit) {
      throw new Error(`${fcDir} is not exsit.`);
    }
    logger.debug(`Path is exsit: ${checkNasPathExsit}`);

    logger.log(`zipping ${fcDir}`);
    const tmpNasZipPath = path.posix.join(path.dirname(fcDir), '.fun-nas-generated.zip');

    const cmd = `cd ${path.dirname(fcDir)} && rm -rf ${tmpNasZipPath} && zip -r ${tmpNasZipPath} ${path.basename(fcDir)}`;
    logger.debug(`zipping cmd: ${cmd}`);
    await super.callCommands(serviceName, cmd);
    logger.log('\'✔\' zip done', 'green');

    logger.log('downloading...');
    const localZipDirname = path.join(process.cwd(), '.s', 'nas');
    await fs.mkdirs(localZipDirname);
    const localZipPath = path.join(localZipDirname, '.fun-nas-generated.zip');
    const { data: bufData } = await super.callDownload(serviceName, tmpNasZipPath);
    logger.log('\'✔\' download done', 'green');

    await new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(localZipPath);
      ws.write(bufData);
      ws.end();
      ws.on('finish', () => {
        resolve('');
      });
      ws.on('error', (error) => {
        logger.error(`${localZipPath} write error : ${error}`);
        reject(error);
      });
    });

    if (!noUnzip) {
      logger.log('unzipping file');
      await unzip(localZipPath, path.resolve(localDir)).then(() => {
        logger.log("'✔' unzip done!", 'green');
      });
      logger.debug(`fs remove ${localZipPath}`);
      // clean
      await fs.remove(localZipPath);
    }

    logger.debug(`send clean request ${fcDir} ${tmpNasZipPath}`);
    await super.callClean(serviceName, tmpNasZipPath);
    logger.log("'✔' download completed!", 'green');
  }
}
