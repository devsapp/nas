import * as core from '@serverless-devs/core';
import _ from 'lodash';
import { makeSureNasUriStartWithSlash } from './utils/utils';
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

  constructor(credentials, regionId: string, fcClient: any) {
    this.accountId = credentials?.AccountID;
    this.region = regionId;

    this.fcClient = fcClient;
  }

  async deploy(inputs: IInputs) {
    const fcDeploy = await core.loadComponent('devsapp/fc-deploy');
    return await fcDeploy.deploy(inputs);
  }

  async remove(inputs: IInputs) {
    try {
      const { data } = await this.fcClient.getService(inputs.props.service.name);
      if (!data?.description.startsWith('当前资源由Serverless Devs自动创建，')) {
        return;
      }
      const fc = await core.loadComponent('devsapp/fc');
      return await fc.remove(inputs);
    } catch (ex) {
      logger.debug(`get service error: ${ex?.code}, ${ex?.message}`);
    }
  }

  async getState(name) {
    return await core.getState(`${this.accountId}-${this.region}-${name}`);
  }

  async versionOrConfigNoChange(serviceName: string, version: string, vpcConfig: IVpcConfig, nasConfig: INasConfig): Promise<boolean> {
    try {
      const { data } = await this.fcClient.getService(serviceName);

      // 检测版本是否有变化
      if (!data?.description.includes(`VERSION: ${version}`)) {
        logger.log(`Helper service new version is ${version}, old version is${data?.description.split('VERSION:')[1]}, need update.`);
        return false;
      }

      // 检测配置是否有变化
      delete data.vpcConfig?.role;
      // @ts-ignore .
      delete vpcConfig?.role;
      // @ts-ignore .
      delete vpcConfig?.vswitchIds;
      const nasConfigCopy: any = _.cloneDeep(nasConfig);
      nasConfigCopy.mountPoints = nasConfig.mountPoints.map(({ serverAddr, fcDir, nasDir }) => ({
        serverAddr: `${serverAddr}:${makeSureNasUriStartWithSlash(nasDir)}`,
        mountDir: fcDir,
      }));
      logger.debug(`data.vpcConfig, vpcConfig:: ${JSON.stringify(data.vpcConfig)} ${JSON.stringify(vpcConfig)}`);
      logger.debug(`data.nasConfig, nasConfig:: ${JSON.stringify(data.nasConfig)} ${JSON.stringify(nasConfigCopy)}`);
      return _.isEqual(data.vpcConfig, vpcConfig) && _.isEqual(data.nasConfig, nasConfigCopy);
    } catch (ex) {
      logger.debug(`get service error: ${ex?.code}, ${ex?.message}`);
    }

    return false;
  }
}
