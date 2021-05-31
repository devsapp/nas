import fs from 'fs-extra';
import { HLogger, ILogger } from '@serverless-devs/core';
import path from 'path';
import { CONTEXT } from '../constant';
import { ICredentials } from '../interface';
import { fcClient } from './client';
import { getHttpTriggerPath, versionPath } from './common/generatePath';

export default class Version {
  @HLogger(CONTEXT) static logger: ILogger;
  static async isNasServerStale(
    profile: ICredentials,
    regionId: string,
    serviceName: string,
    functionName: string,
  ): Promise<boolean> {
    const client = fcClient(regionId, profile);
    const httpPath = getHttpTriggerPath(serviceName, functionName);

    try {
      this.logger.debug(CONTEXT, `Get verison path: ${httpPath}`);
      const res = await client.get(versionPath(httpPath));
      this.logger.debug(CONTEXT, `Get verison response: ${JSON.stringify(res, null, '  ')}`);
      const { curVersionId } = res.data;

      const version = await this.getVersion();

      this.logger.debug(CONTEXT, `curVersionId is: ${curVersionId}, version is: ${version}.`);

      const isNew = curVersionId === version;
      if (!isNew) {
        this.logger.warn(
          CONTEXT,
          'The auxiliary function is not the latest code, the function needs to be updated.',
        );
      }

      return isNew;
    } catch (ex) {
      this.logger.debug(CONTEXT, ex);
      this.logger.warn(CONTEXT, 'Failed to request version, update function.');
      return false;
    }
  }

  static async getVersion() {
    const versionFile = path.join(__dirname, 'fcResources', 'VERSION');

    return (await fs.readFile(versionFile)).toString();
  }
}
