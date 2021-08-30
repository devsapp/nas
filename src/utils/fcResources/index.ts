import { HLogger, ILogger, spinner } from '@serverless-devs/core';
import _ from 'lodash';
import path from 'path';
import Version from '../version';
import { fcClient } from '../client';
import { CONTEXT, FUNNAME, ENSURE_NAS_DIR_HELPER_SERVICE, ENSURE_NAS_DIR_EXIST_FUNCTION } from '../../constant';
import { IInputs, IProperties, ICredentials } from '../../interface';
import { sleep, transformNasDirPath, isNcc } from '../utils';
import FC from './fc';

let ENSURENASDIREXISTFILENAME = path.join(__dirname, 'ensure-nas-dir-exist.zip');
if (isNcc(__dirname)) {
  ENSURENASDIREXISTFILENAME = path.join(__dirname, 'utils', 'fcResources', 'ensure-nas-dir-exist.zip');
}

const getNasServerFile = async (): Promise<string> => {
  if (isNcc(__dirname)) {
    return path.join(__dirname, 'utils', 'fcResources', `nas-server-${await Version.getVersion()}.zip`);
  }
  return path.join(__dirname, `nas-server-${await Version.getVersion()}.zip`);
};

export default class Resources {
  @HLogger(CONTEXT) logger: ILogger;
  fcClient: any;
  profile: ICredentials;

  constructor(regionId: string, profile: ICredentials) {
    this.fcClient = fcClient(regionId, profile);
    this.profile = profile;
  }

  async init(inputs: IInputs, mountPointDomain: string) {
    await this.deployEnsureNasDirHelperService(inputs, mountPointDomain); // 确保目录辅助函数：确保目录
    await this.deployNasOperationHelperService(inputs, mountPointDomain); // 操作辅助函数：check、cp、ls、command...
  }

  async remove(inputs: IInputs) {
    const nasServiceProps = await this.transformYamlConfigToFcbaseConfig(_.cloneDeep(inputs.props), '', false);
    await FC.remove(this.fcClient, nasServiceProps);

    const ensureNasDirProps = await this.transformYamlConfigToFcbaseConfig(_.cloneDeep(inputs.props), '', true);
    await FC.remove(this.fcClient, ensureNasDirProps);
  }

  async deployNasOperationHelperService(inputs: IInputs, mountPointDomain: string) {
    const vm = spinner('Auxiliary function for deployment operation nas...');
    try {
      const nasServiceInputs = await this.transformYamlConfigToFcbaseConfig(
        _.cloneDeep(inputs.props),
        mountPointDomain,
        false,
      );
      this.logger.debug('deploy nas service');

      await FC.deploy(this.fcClient, nasServiceInputs);
      this.logger.debug('Waiting for trigger to be up');
      await sleep(2500);
    } catch (ex) {
      vm.fail();
      throw ex;
    }
    vm.stop();
  }

  async deployEnsureNasDirHelperService(inputs: IInputs, mountPointDomain: string) {
    const vm = spinner('Deploy a helper function to ensure the existence of the nas directory...');
    try {
      const ensureNasDirProps = await this.transformYamlConfigToFcbaseConfig(
        _.cloneDeep(inputs.props),
        mountPointDomain,
        true,
      );
      this.logger.debug(`deploy ensure nas dir input: ${ensureNasDirProps}`);
      await FC.deploy(this.fcClient, ensureNasDirProps);
      await sleep(500);

      const { serviceName, functionName } = ensureNasDirProps.function;
      const { mountDir, nasDir } = inputs.props;

      this.logger.debug(
        `Invoke fc function, service name is: ${serviceName}, function name is: ${
          functionName
        }, event is: ${JSON.stringify([nasDir])}`,
      );
      await this.invokeFcUtilsFunction(
        serviceName,
        functionName,
        transformNasDirPath(JSON.stringify([path.join(mountDir, nasDir)])),
      );
    } catch (ex) {
      vm.fail();
      throw ex;
    }
    vm.stop();
  }

  async transformYamlConfigToFcbaseConfig(
    inputProps: IProperties,
    mountPointDomain: string,
    isEnsureNasDirExist: boolean,
  ) {
    const {
      regionId,
      serviceName,
      functionName = FUNNAME,
      role,
      vpcId,
      vSwitchId,
      securityGroupId,
      mountDir,
      nasDir,
      userId = 10003,
      groupId = 10003,
    } = inputProps;

    const service = isEnsureNasDirExist
      ? `${serviceName}-${ENSURE_NAS_DIR_HELPER_SERVICE}`
      : serviceName;
    const funName = isEnsureNasDirExist ? ENSURE_NAS_DIR_EXIST_FUNCTION : functionName;

    const props: any = {
      region: regionId,
      service: {
        serviceName: service,
        role,
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
              serverAddr: `${mountPointDomain}:/${isEnsureNasDirExist ? '' : nasDir}`,
              mountDir,
            },
          ],
        },
      },
      function: {
        serviceName: service,
        functionName: funName,
        handler: 'index.handler',
        timeout: 600,
        memorySize: 256,
        filename: isEnsureNasDirExist ? ENSURENASDIREXISTFILENAME : await getNasServerFile(),
        runtime: 'nodejs12',
        environmentVariables: {
          PATH: '/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/code/bin',
        },
      },
    };

    if (!isEnsureNasDirExist) {
      props.triggers = [
        {
          serviceName: service,
          functionName: funName,
          triggerName: 'httpTrigger',
          triggerType: 'http',
          triggerConfig: {
            authType: 'function',
            methods: ['POST', 'GET'],
          },
        },
      ];
    }

    return props;
  }

  async invokeFcUtilsFunction(serviceName: string, functionName: string, event: string) {
    const rs = await this.fcClient.invokeFunction(serviceName, functionName, event, {
      'X-Fc-Log-Type': 'Tail',
    });

    if (rs.data !== 'OK') {
      const log = rs.headers['x-fc-log-result'];

      if (log) {
        const decodedLog = Buffer.from(log, 'base64');
        this.logger.warn(
          `Invoke fc function ${serviceName}/${functionName} response is: ${decodedLog}`,
        );
        if (decodedLog.toString().toLowerCase()?.includes('permission denied')) {
          throw new Error(
            `fc utils function ${functionName} invoke error, error message is: ${decodedLog}`,
          );
        }
        throw new Error(
          `fc utils function ${functionName} invoke error, error message is: ${decodedLog}`,
        );
      }
    }
  }
}
