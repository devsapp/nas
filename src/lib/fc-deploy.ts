import * as core from '@serverless-devs/core';
import _ from 'lodash';
import FcClient from './utils/client';
import { makeSureNasUriStartWithSlash } from './utils';
import { IInputs, INasConfig, IVpcConfig } from '../interface';
import logger from '../common/logger';

export default class FcDeploy {
  static genComponentInputs(inputs, props): IInputs {
    const inputsCopy = _.cloneDeep(inputs);
    inputsCopy.props = props;
    inputsCopy.args = '-y --use-local --escape-nas-check';
    delete inputsCopy.argsObj;
    delete inputsCopy.ArgsObj;

    return inputsCopy;
  }

  accountId: string;
  region: string;
  fcClient: any;

  constructor(credentials, regionId: string) {
    this.accountId = credentials?.AccountID;
    this.region = regionId;

    this.fcClient = FcClient(regionId, credentials);
  }

  async deploy(inputs: IInputs) {
    const fcDeploy = await core.loadComponent('devsapp/fc-deploy');
    return await fcDeploy.deploy(inputs);
  }

  async remove(inputs: IInputs) {
    const fc = await core.loadComponent('devsapp/fc');
    return await fc.remove(inputs);
  }

  async getState(name) {
    return await core.getState(`${this.accountId}-${this.region}-${name}`);
  }

  async versionOrConfigNoChange(serviceName: string, version: string, vpcConfig: IVpcConfig, nasConfig: INasConfig): Promise<boolean> {
    try {
      const { data } = await this.fcClient.getService(serviceName);

      // 检测版本是否有变化
      if (!data?.description.endsWith(`VERSION: ${version}`)) {
        return false;
      }

      // 检测配置是否有变化
      delete data.vpcConfig?.role;
      const nasConfigCopy: any = _.cloneDeep(nasConfig);
      nasConfigCopy.mountPoints = nasConfig.mountPoints.map(({ serverAddr, fcDir, nasDir }) => ({
        serverAddr: `${serverAddr}:${makeSureNasUriStartWithSlash(nasDir)}`,
        mountDir: fcDir,
      }));
      return _.isEqual(data.vpcConfig, vpcConfig) && _.isEqual(data.nasConfig, nasConfigCopy);
    } catch (ex) {
      logger.debug(`get service error: ${ex?.code}, ${ex?.message}`);
    }

    return false;
  }
}
