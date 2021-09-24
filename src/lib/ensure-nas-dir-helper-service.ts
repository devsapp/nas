import _ from 'lodash';
import path from 'path';
import { IInputs, IMountPoints, EnsureNasDirHelperServiceInputs, RemoveHelperServiceInputs, isVpcConfig, isRemoveHelperServiceProps } from '../interface';
import { isNcc, getCodeVersion, convertWin32PathToLinux, sleep, makeSureNasUriStartWithSlash } from './utils';
import promiseRetry from './utils/retry';
import FcDeploy from './fc-deploy';
import logger from '../common/logger';


const FUNCTION_NAME = 'nas_dir_checker';
const getServiceName = (name: string) => `_FC_NAS_${name}-ensure-nas-dir-exist-service`;
const version = getCodeVersion();

export default class EnsureNasDirHelperService extends FcDeploy {
  /**
   * 处理 mountPoints 参数
   * @param mountPoints 主函数服务的 nas 配置
   * @returns
   *  mountPoints 主函数挂载 nas 根目录的配置
   *  mappingDirPaths 需要创建 nas 目录在辅助函数中的目录映射
   */
  static handlerMountPoint(mountPoints: IMountPoints): { mountPoints: IMountPoints; mappingDirPaths: string[] } {
    const mappingDirPaths = [];
    const nasRootMountPoints = mountPoints.map(({ fcDir, nasDir, serverAddr }) => {
      const mappingDirPath = path.join(fcDir, makeSureNasUriStartWithSlash(nasDir).substr(1));
      mappingDirPaths.push(mappingDirPath);
      return {
        serverAddr,
        fcDir,
        nasDir: '/',
      };
    });
    return { mountPoints: nasRootMountPoints, mappingDirPaths };
  }

  /**
   * 生成 fc-deploy 支持的入参配置
   * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
   * @returns .
   */
  static genDeployComponentInputs(inputs: EnsureNasDirHelperServiceInputs): IInputs {
    const {
      regionId,
      serviceName,
      vpcConfig,
      groupId = 10003,
      userId = 10003,
      mountPoints,
      description,
    } = inputs.props || {};
    if (_.isEmpty(regionId)) throw new Error('Parameter is missing regionId');
    if (_.isEmpty(serviceName)) throw new Error('Parameter is missing serviceName');
    if (!isVpcConfig(vpcConfig)) throw new Error(`The parameter vpcConfig does not meet expectations: \n${JSON.stringify(vpcConfig || {}, null, 2)}`);
    if (!_.isArray(mountPoints) || _.isEmpty(mountPoints)) throw new Error('The parameter mountPoints does not meet expectations');

    const service = getServiceName(serviceName);

    const zipFileName = `ensure-nas-dir-exist-${version}.zip`;
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
          mountPoints: EnsureNasDirHelperService.handlerMountPoint(mountPoints).mountPoints,
        },
      },
      function: {
        name: FUNCTION_NAME,
        handler: 'index.handler',
        timeout: 600,
        memorySize: 128,
        codeUri: ENSURENASDIREXISTFILENAME,
        runtime: 'nodejs12',
      },
    };

    return FcDeploy.genComponentInputs(inputs, props);
  }

  /**
   * 初始化辅助函数，并且确保目录存在
   * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
   */
  async init(inputs: EnsureNasDirHelperServiceInputs) {
    const deployInputs = EnsureNasDirHelperService.genDeployComponentInputs(inputs);
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
    }

    await this.createNasDirectory(serviceName, inputs.props.mountPoints);
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

  private async createNasDirectory(serviceName: string, mountPoints: IMountPoints) {
    const { mappingDirPaths } = EnsureNasDirHelperService.handlerMountPoint(mountPoints);
    const nasPaths = convertWin32PathToLinux(JSON.stringify(mappingDirPaths));

    await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const rs = await this.fcClient.invokeFunction(serviceName, FUNCTION_NAME, nasPaths, {
          'X-Fc-Log-Type': 'Tail',
        });

        if (rs.data !== 'OK') {
          const {
            'x-fc-log-result': log,
            'x-fc-request-id': requestId,
          } = rs.headers || {};

          if (requestId) {
            logger.debug(`invoke create nas directory error request id: ${requestId}`);
          }

          if (log) {
            const decodedLog = Buffer.from(log, 'base64');
            throw new Error(
              `fc utils function ${serviceName}/${FUNCTION_NAME} invoke error, error message is: ${decodedLog}`,
            );
          }
        }
      } catch (ex) {
        logger.debug(`error when deploy, error is: \n${ex}`);
        logger.debug(`Retrying createNasDirectory: retry ${times} time`);
        await sleep(1000);
        retry(ex);
      }
    });
  }
}
