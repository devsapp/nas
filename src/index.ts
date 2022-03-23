import * as core from '@serverless-devs/core';
import _ from 'lodash';
import logger from './common/logger';
import Base from './common/base';
import {
  IInputs,
  RemoveInputs,
  CommandInputs,
  EnsureNasDirHelperServiceInputs,
  RemoveHelperServiceInputs,
  DeployInputs,
} from './interface';
import EnsureNasDirInitHelperService from './lib/ensure-nas-dir-helper-service';
import NasOperationInitHelperService from './lib/nas-operation-helper-service';
import ParameterAdaptation from './lib/utils/parameter-adaptation';
import { getCredential, makeSureNasUriStartWithSlash, argReplace, getConfigDirname } from './lib/utils/utils';
import { checkInputs } from './lib/command/utils';
import Command from './lib/command/command';
import Download from './lib/command/download';
import Upload from './lib/command/upload';
import Nas from './lib/nas';
import * as help from './lib/help';

const APTS = { boolean: ['help', 'y'], alias: { help: 'h', 'assume-yes': 'y' } };
export default class NasCompoent extends Base {
  fcClient: any;
  /**
   * 创建 nas 资源，并创建辅助函数
   * @param inputs props 参数参考 IDeployProps
   */
  async deploy(inputs: DeployInputs) {
    // @ts-ignore 兼容 0.0.* 的版本
    inputs.props = ParameterAdaptation.adapta01(inputs.props);
    logger.debug(`new input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const commandData: any = core.commandParse(inputs, APTS);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      core.help(help.DEPLOY_HELP);
      return;
    }
    Nas.checkDeployProps(inputs.props);
    const credentials = await getCredential(inputs.credentials, inputs);

    const inputsCopy = _.cloneDeep(inputs);
    const { access } = inputsCopy.project || {};
    const { regionId, mountPoints, serviceName, nasDir } = inputsCopy.props;
    this.reportComponent('deploy', credentials.AccountID);

    if (_.isEmpty(mountPoints)) {
      const nas = new Nas(regionId, credentials, commandData.data?.y, serviceName, inputs.path?.configPath);
      const { mountPointDomain, fileSystemId } = await nas.init(inputsCopy.props);

      const reportContent = { region: regionId, mountPointDomain, fileSystemId };
      super.__report({ access, name: 'nas', content: reportContent });

      inputsCopy.props.mountPoints = [{
        serverAddr: mountPointDomain,
        nasDir: makeSureNasUriStartWithSlash(nasDir || serviceName),
        fcDir: '/mnt/auto',
      }];
    }

    await this.initHelperService(inputsCopy);

    return {
      mountPoints: inputsCopy.props.mountPoints,
    };
  }

  /**
   * 删除 nas 资源，并删除辅助函数
   * @param inputs .
   */
  async remove(inputs: RemoveInputs) {
    logger.debug(`new input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const commandData: any = core.commandParse(inputs, APTS);
    const { regionId, serviceName } = inputs.props;
    if (_.isEmpty(regionId)) {
      throw new Error('Parameter is missing regionId');
    }

    const credentials = await getCredential(inputs.credentials, inputs);
    this.reportComponent('remove', credentials.AccountID);

    if (!_.isEmpty(serviceName)) {
      // @ts-ignore . 如果 serviceName 存在，则删除辅助函数
      await this.removeHelperService(inputs);
    }

    const nas = new Nas(regionId, credentials, commandData.data?.y);
    const { fileSystemId, mountPointDomains } = await nas.remove(inputs.props);

    if (fileSystemId) {
      super.__report({
        name: 'nas',
        access: inputs.project?.access,
        content: {
          region: regionId,
          mountPointDomains,
          fileSystemId: '',
        },
      });
    }
  }

  /**
   * 调用 fc 的内置指令
  */
  async command(inputs: CommandInputs) {
    // @ts-ignore 兼容 0.0.* 的版本
    inputs.props = ParameterAdaptation.adapta01(inputs.props);
    const { props, args } = inputs;
    logger.debug(`new input.props: ${JSON.stringify(props)}, inputs.args: ${args}`);
    const commandData: any = core.commandParse(inputs, APTS);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help && !args?.includes('-lh')) {
      return core.help('');
    }

    checkInputs(props);
    const credentials = await getCredential(inputs.credentials, inputs);
    const fcClient = await this.getFcClient(inputs);
    this.reportComponent('command', credentials.AccountID);

    const nasOperationInitHelperService = new NasOperationInitHelperService(credentials, inputs.props?.regionId, fcClient);
    await nasOperationInitHelperService.init(inputs);

    const command = new Command(credentials, props.regionId, fcClient);
    await command.command(props.serviceName, args);
  }

  /**
   * 下载文件到本地
  */
  async download(inputs: IInputs) {
    logger.debug('start');
    // @ts-ignore 兼容 0.0.* 的版本
    inputs.props = ParameterAdaptation.adapta01(inputs.props);
    const { props, args } = inputs;
    logger.debug(`new input.props: ${JSON.stringify(props)}, inputs.args: ${args}`);

    const apts = {
      boolean: ['help', 'override', 'no-unzip'],
      alias: { override: 'o', help: 'h' },
    };
    const commandData: any = core.commandParse(inputs, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      return core.help('');
    }

    checkInputs(props);
    const configPath = getConfigDirname(inputs?.path?.configPath);
    // --no 开头 commandParse 方法解析不出 true 这种参数
    const noUnzip = commandData.data?.['no-unzip'] || args?.includes('--no-unzip');
    const override = commandData.data?.override;
    const [fcDir, localDir] = commandData.data?._ || [];
    if (_.isEmpty(localDir) || _.isEmpty(fcDir)) {
      throw new Error(`Handle the exception of input parameters, localDir is ${localDir}, fcDir is ${fcDir}.\nPlease execute '$ s nas download -h' to view the example`);
    }
    const credentials = await getCredential(inputs.credentials, inputs);
    this.reportComponent('command', credentials.AccountID);
    await this.initHelperService(inputs);
    const download = new Download(credentials, props.regionId, this.fcClient);
    await download.cpFromNasToLocal(props, { localDir, fcDir: argReplace(fcDir), noUnzip, override }, configPath);
  }

  /**
   * 上传文件到 nas
  */
  async upload(inputs: IInputs) {
    logger.debug('start');
    // @ts-ignore 兼容 0.0.* 的版本
    inputs.props = ParameterAdaptation.adapta01(inputs.props);
    const { props, args } = inputs;
    logger.debug(`new input.props: ${JSON.stringify(props)}, inputs.args: ${args}`);

    const apts = {
      boolean: ['recursive', 'help', 'override'],
      alias: { recursive: 'r', override: 'o', help: 'h' },
    };
    const commandData: any = core.commandParse(inputs, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      return core.help('');
    }

    checkInputs(props);
    const { recursive } = commandData.data || {};
    const override = commandData.data?.override;
    const [localDir, fcDir] = commandData.data?._ || [];
    if (_.isEmpty(localDir) || _.isEmpty(fcDir)) {
      throw new Error(`Handle the exception of input parameters, localDir is ${localDir}, fcDir is ${fcDir}.\nPlease execute '$ s nas upload -h' to view the example`);
    }
    const credentials = await getCredential(inputs.credentials, inputs);
    this.reportComponent('command', credentials.AccountID);
    await this.initHelperService(inputs);

    const upload = new Upload(credentials, props.regionId, this.fcClient);
    await upload.cpFromLocalToNas(props, { localDir, fcDir: argReplace(fcDir), recursive, override });
  }

  /**
   * 初始化辅助函数，并且确保目录存在
   * @param inputs props 参数参考 HelperServiceProps
   */
  async initHelperService(inputs: IInputs) {
    // @ts-ignore 兼容 0.0.* 的版本
    inputs.props = ParameterAdaptation.adapta01(inputs.props);
    logger.debug(`new input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const credentials = await getCredential(inputs.credentials, inputs);
    const fcClient = await this.getFcClient(inputs);

    const ensureNasDirInitHelperService = new EnsureNasDirInitHelperService(credentials, inputs.props?.regionId, fcClient);
    await ensureNasDirInitHelperService.init(inputs);

    const nasOperationInitHelperService = new NasOperationInitHelperService(credentials, inputs.props?.regionId, fcClient);
    await nasOperationInitHelperService.init(inputs);
  }

  /**
   * 创建确保 nas 目录存在的辅助函数，并确保目录存在
   * @param inputs .
   */
  async ensureNasDir(inputs: EnsureNasDirHelperServiceInputs) {
    // @ts-ignore 兼容 0.0.* 的版本
    inputs.props = ParameterAdaptation.adapta01(inputs.props);
    logger.debug(`new input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const credentials = await getCredential(inputs.credentials, inputs);
    const fcClient = await this.getFcClient(inputs);

    const ensureNasDirInitHelperService = new EnsureNasDirInitHelperService(credentials, inputs.props?.regionId, fcClient);
    await ensureNasDirInitHelperService.init(inputs);
  }

  /**
   * 删除辅助函数
   * @param inputs .
   */
  async removeHelperService(inputs: RemoveHelperServiceInputs) {
    logger.debug(`new input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    await this.removeEnsureNasDirHelperService(inputs);

    const credentials = await getCredential(inputs.credentials, inputs);
    try {
      const fcClient = await this.getFcClient(inputs);
      const nasOperationInitHelperService = new NasOperationInitHelperService(credentials, inputs.props?.regionId, fcClient);
      await nasOperationInitHelperService.remove(inputs);
    } catch (ex) {
      logger.debug(`remove nasOperationInitHelperService error: ${ex.code}, ${ex.message}`);
    }
  }

  /**
   * 删除确保 nas 目录存在的辅助函数
   * @param inputs .
   */
  async removeEnsureNasDirHelperService(inputs: RemoveHelperServiceInputs) {
    logger.debug(`new input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const credentials = await getCredential(inputs.credentials, inputs);
    try {
      const fcClient = await this.getFcClient(inputs);
      const ensureNasDirInitHelperService = new EnsureNasDirInitHelperService(credentials, inputs.props?.regionId, fcClient);
      await ensureNasDirInitHelperService.remove(inputs);
    } catch (ex) {
      logger.debug(`remove ensureNasDirInitHelperService error: ${ex.code}, ${ex.message}`);
    }
  }

  private reportComponent(command: string, uid: string) {
    core.reportComponent('fc-nas', { uid, command });
  }

  private async getFcClient(inputs) {
    const fcCore = await core.loadComponent('devsapp/fc-core');
    const props = {
      access: inputs.credentials?.Alias || inputs.project?.access,
      credentials: inputs.credentials,
      region: inputs.props?.regionId,
      timeout: 3600,
    };
    const client = await fcCore.makeFcClient(props);
    client.get = async (path, query, headers) => {
      const res = await client.request('GET', path, query, null, headers);
      const data = (res && res.data) || {};
      if (data.error) {
        throw new Error(data.error);
      }

      return res;
    };

    client.post = async (path, body, headers, queries, opts = {}) => {
      const res = await client.request('POST', path, queries, body, headers, opts);
      const data = (res && res.data) || {};
      if (data.error) {
        throw new Error(data.error);
      }

      return res;
    };
    this.fcClient = client;
    return client;
  }
}

