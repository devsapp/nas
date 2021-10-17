import _ from 'lodash';
import path from 'path';
import { IInputs, NasOperationInitHelperServiceInputs, isRemoveHelperServiceProps, isVpcConfig, RemoveHelperServiceInputs } from '../interface';
import { isNcc, getCodeVersion, sleep } from './utils/utils';
import FcDeploy from './fc-deploy';
import logger from '../common/logger';

const version = getCodeVersion();
const zipFileName = `nas-server-${version}.zip`;
const NAS_HELPER_SERVERVICE_MEMORY_SIZE = parseInt(process.env.NAS_HELPER_SERVERVICE_MEMORY_SIZE || '256', 10); // 操作 nas 辅助函数的内存大小

export const getServiceName = (name: string) => `_FC_NAS_${name}`;
export const NAS_OPERATION_HELPER_FUNCTION_NAME = 'nas_dir_checker'; // 操作 nas 辅助函数的函数名称

export default class NasOperationInitHelperService extends FcDeploy {
  /**
   * 生成 fc-deploy 支持的入参配置
   * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
   * @returns .
   */
  static genDeployComponentInputs(inputs: NasOperationInitHelperServiceInputs): IInputs {
    const {
      regionId,
      serviceName,
      vpcConfig,
      groupId = 10003,
      userId = 10003,
      mountPoints,
      description,
    } = inputs.props || {};
    if (_.isEmpty(regionId)) {
      throw new Error('Parameter is missing regionId');
    }
    if (_.isEmpty(serviceName)) {
      throw new Error('Parameter is missing serviceName');
    }
    if (!isVpcConfig(vpcConfig)) {
      throw new Error(`The parameter vpcConfig does not meet expectations: \n${JSON.stringify(vpcConfig || {}, null, 2)}`);
    }
    if (!_.isArray(mountPoints) || _.isEmpty(mountPoints)) {
      throw new Error('The parameter mountPoints does not meet expectations');
    }

    const service = getServiceName(serviceName);

    let ENSURENASDIREXISTFILENAME = path.join(__dirname, '..', 'helper-service-code', zipFileName);
    if (isNcc(__dirname)) {
      ENSURENASDIREXISTFILENAME = path.join(__dirname, 'helper-service-code', zipFileName);
    }

    const props = {
      region: regionId,
      service: {
        name: service,
        role: inputs.props?.role,
        description: `${description} VERSION: ${version}`,
        vpcConfig,
        nasConfig: {
          userId,
          groupId,
          mountPoints,
        },
      },
      function: {
        name: NAS_OPERATION_HELPER_FUNCTION_NAME,
        handler: 'index.handler',
        timeout: 600,
        memorySize: NAS_HELPER_SERVERVICE_MEMORY_SIZE,
        codeUri: ENSURENASDIREXISTFILENAME,
        runtime: 'nodejs12',
        environmentVariables: {
          PATH: '/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/code/bin',
        },
      },
      triggers: [{
        name: 'httpTrigger',
        type: 'http',
        config: {
          authType: 'function',
          methods: ['POST', 'GET'],
        },
      }],
    };

    return FcDeploy.genComponentInputs(inputs, props);
  }

  /**
   * 初始化辅助函数，并且确保目录存在
   * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
   */
  async init(inputs: NasOperationInitHelperServiceInputs) {
    const deployInputs = NasOperationInitHelperService.genDeployComponentInputs(inputs);
    logger.debug(`genDeployComponentInputs props: ${JSON.stringify(deployInputs.props)}`);
    logger.debug(`genDeployComponentInputs args: ${deployInputs.args}`);

    const serviceName = deployInputs.props.service.name;
    const {
      vpcConfig,
      nasConfig,
    } = deployInputs.props.service;

    const isNewVersion = await super.versionOrConfigNoChange(serviceName, version, vpcConfig, nasConfig);

    if (!isNewVersion) {
      await super.deploy(deployInputs);
      sleep(1500);
    }
  }

  async remove(inputs: RemoveHelperServiceInputs) {
    if (!isRemoveHelperServiceProps(inputs.props)) {
      throw new Error('Remove helper service regionId and serviceName must exist');
    }

    const inputsCopy: any = _.cloneDeep(inputs);
    inputsCopy.props = {
      region: inputs.props.regionId,
      service: {
        name: getServiceName(inputs.props.serviceName),
      },
    };

    inputsCopy.args = '-y';
    await super.remove(inputsCopy);
  }
}
