import _ from 'lodash';
import path from 'path';
import { IInputs } from '../interface';
import { isNcc, getCodeVersion, convertWin32PathToLinux, sleep } from '../utils';
import FcClient from '../utils/client';
import promiseRetry from '../utils/retry';
import FcDeploy from './fc-deploy';
import logger from '../common/logger';

interface HelperServiceProps {
  regionId: string;
  serviceName: string; // 主函数的服务名称
  vpcId: string;
  vSwitchId: string[] | string; // 支持数组和字符串
  securityGroupId: string;
  mountPointDomain: string;
  nasDir: string;
  fcDir?: string;
  groupId?: number;
  userId?: number;
  description?: string;
  role?: string; // 不填写遵循 fc-deploy 的逻辑
}

export interface EnsureNasDirHelperServiceInputs extends IInputs {
  props: HelperServiceProps;
}

const FUNCTION_NAME = 'nas_dir_checker';
const FC_DIR = '/mnt/auto';
const getServiceName = (name: string) => `_FC_NAS_${name}-ensure-nas-dir-exist-service`;
const version = getCodeVersion();

export default class EnsureNasDirHelperService extends FcDeploy {
  static genDeployComponentInputs(inputs: EnsureNasDirHelperServiceInputs): IInputs {
    const {
      regionId,
      serviceName,
      mountPointDomain,
      nasDir,
      vpcId,
      vSwitchId,
      securityGroupId,
      groupId = 10003,
      userId = 10003,
    } = inputs.props || {};
    if (_.isNil(regionId)) throw new Error('Parameter is missing regionId');
    if (_.isNil(serviceName)) throw new Error('Parameter is missing serviceName');
    if (_.isNil(mountPointDomain)) throw new Error('Parameter is missing mountPointDomain');
    if (_.isNil(nasDir)) throw new Error('Parameter is missing nasDir');
    if (_.isNil(vpcId)) throw new Error('Parameter is missing vpcId');
    if (_.isNil(securityGroupId)) throw new Error('Parameter is missing securityGroupId');
    if (_.isEmpty(vSwitchId)) throw new Error('Parameter is missing vSwitchId');

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
        vpcConfig: {
          vpcId,
          securityGroupId,
          vswitchIds: _.isString(vSwitchId) ? [vSwitchId] : vSwitchId,
        },
        nasConfig: {
          userId,
          groupId,
          mountPoints: [
            {
              serverAddr: mountPointDomain,
              nasDir: '/',
              fcDir: FC_DIR,
            },
          ],
        },
      },
      function: {
        name: FUNCTION_NAME,
        handler: 'index.handler',
        timeout: 600,
        memorySize: 256,
        codeUri: ENSURENASDIREXISTFILENAME,
        runtime: 'nodejs12',
      },
    };

    return FcDeploy.genComponentInputs(inputs, props);
  }

  fcClient: any;

  constructor(credentials, regionId: string) {
    super();

    this.fcClient = FcClient(regionId, credentials);
  }

  async init(inputs: EnsureNasDirHelperServiceInputs) {
    const deployInputs = EnsureNasDirHelperService.genDeployComponentInputs(inputs);
    logger.debug(`genDeployComponentInputs props: ${JSON.stringify(deployInputs.props)}`);

    const serviceName = deployInputs.props.service.name;
    const { nasDir } = inputs.props;

    const isNewVersion = await this.checkVersion(serviceName);
    if (!isNewVersion) {
      await this.deploy(deployInputs);
    }

    await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        await this.createNasDirectory(serviceName, nasDir);
      } catch (ex) {
        logger.debug(`error when deploy, error is: \n${ex}`);
        const retryMsg = `Retrying createNasDirectory: retry ${times} time`;
        logger.log(retryMsg, 'red');
        await sleep(1000);
        retry(ex);
      }
    });
  }

  async checkVersion(serviceName: string): Promise<boolean> {
    try {
      const { data } = await this.fcClient.invokeFunction(serviceName, FUNCTION_NAME, JSON.stringify({ getVersion: true }));
      return data === version;
    } catch (ex) {
      logger.debug(`invoke helper function error: ${ex?.code}, ${ex?.message}`);
    }
    return false;
  }

  async createNasDirectory(serviceName: string, nasDir: string) {
    const nasPath = convertWin32PathToLinux(path.join(FC_DIR, nasDir));

    const rs = await this.fcClient.invokeFunction(serviceName, FUNCTION_NAME, JSON.stringify({ dirs: [nasPath] }), {
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
  }
}
