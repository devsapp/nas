import { HLogger, ILogger, spinner } from '@serverless-devs/core';
import _ from 'lodash';
import path from 'path';
import Version from '../version';
import { fcClient } from '../client';
import { CONTEXT, FUNNAME } from '../../constant';
import { IInputs, IProperties, ICredentials } from '../../interface';
import { sleep } from '../utils';
import FC from './fc';

const ENSURENASDIREXISTSERVICE = 'ensure-nas-dir-exist-service';
const ENSURENASDIREXISTFUNCTION = 'nas_dir_checker';
const ENSURENASDIREXISTFILENAME = path.join(__dirname, 'ensure-nas-dir-exist.zip');

const getNasServerFile = async (): Promise<string> =>
  path.join(__dirname, `nas-server-${await Version.getVersion()}.zip`);

export default class Resources {
  @HLogger(CONTEXT) logger: ILogger;
  fcClient: any;
  profile: ICredentials;

  constructor(regionId: string, profile: ICredentials) {
    this.fcClient = fcClient(regionId, profile);
    this.profile = profile;
  }

  async init(inputs: IInputs, mountPointDomain: string) {
    const vm = spinner('Deploy helper function...');
    try {
      await this.deployEnsureNasDir(inputs, mountPointDomain);

      await this.deployNasService(inputs, mountPointDomain);
    } catch (ex) {
      vm.fail();
      throw ex;
    }
    vm.succeed('upload done');
  }

  async remove(inputs: IInputs) {
    const nasServiceProps = await this.transformYamlConfigToFcbaseConfig(_.cloneDeep(inputs.props), '', false);
    await FC.remove(this.fcClient, nasServiceProps);

    const ensureNasDirProps = await this.transformYamlConfigToFcbaseConfig(_.cloneDeep(inputs.props), '', true);
    await FC.remove(this.fcClient, ensureNasDirProps);
  }

  async deployNasService(inputs: IInputs, mountPointDomain: string) {
    const nasServiceInputs = await this.transformYamlConfigToFcbaseConfig(
      _.cloneDeep(inputs.props),
      mountPointDomain,
      false,
    );
    this.logger.debug('deploy nas service');

    await FC.deploy(this.fcClient, nasServiceInputs);
    this.logger.debug('Waiting for trigger to be up');
    await sleep(2500);
  }

  async deployEnsureNasDir(inputs: IInputs, mountPointDomain: string) {
    const ensureNasDirProps = await this.transformYamlConfigToFcbaseConfig(
      _.cloneDeep(inputs.props),
      mountPointDomain,
      true,
    );
    await FC.deploy(this.fcClient, ensureNasDirProps);

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
      JSON.stringify([path.join(mountDir, nasDir)]),
    );
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
      ? `${serviceName}-${ENSURENASDIREXISTSERVICE}`
      : serviceName;
    const funName = isEnsureNasDirExist ? ENSURENASDIREXISTFUNCTION : functionName;

    const props: any = {
      region: regionId,
      service: {
        serviceName: service,
        role,
        vpcConfig: {
          vpcId,
          securityGroupId,
          vswitchIds: [vSwitchId],
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
        if (decodedLog.toString().toLowerCase().includes('permission denied')) {
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
