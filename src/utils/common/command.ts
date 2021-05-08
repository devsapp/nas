import { HLogger, ILogger } from '@serverless-devs/core';
import { fcClient } from '../client';
import { ICredentials } from '../../interface';
import {
  getHttpTriggerPath,
  commandsPath,
} from './generatePath';
import * as constant from '../../constant';
import * as utils from './utils';

export default class Command {
  fcClient: any;
  @HLogger(constant.CONTEXT) logger: ILogger;

  constructor(regionId: string, credentials: ICredentials) {
    this.fcClient = fcClient(regionId, credentials);
  }

  async command(props) {
    const {
      serviceName,
      functionName,
      args,
      mountDir,
      nasDir,
    } = props;
    const nasHttpTriggerPath = getHttpTriggerPath(serviceName, functionName);
    const cmd = utils.commandCmd(args, mountDir, nasDir);

    this.logger.debug(`command cmd: ${cmd}, nasHttpTriggerPath: ${nasHttpTriggerPath}`);

    const lsResponse = await this.fcClient.post(commandsPath(nasHttpTriggerPath), { cmd });
    this.logger.log(lsResponse.data.stdout);
    this.logger.log(lsResponse.data.stderr);
  }
}