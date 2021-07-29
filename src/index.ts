import {
  HLogger,
  ILogger,
  getCredential,
  help,
  commandParse,
  reportComponent,
} from '@serverless-devs/core';
import FC from './utils/fcResources/fc';
import _ from 'lodash';
import * as constant from './constant';
import { IInputs, IProperties, ICommandParse } from './interface';
import StdoutFormatter from './stdout-formatter';
import Nas from './utils/nas';
import Common from './utils/common';
import Version from './utils/version';
import FcResources from './utils/fcResources';
import { getMountDir, nasUriHandler } from './utils/utils';
import { parseNasUri } from './utils/common/utils';
import { FcEndpoint } from './utils/client';
import Base from './common/base';

export default class NasCompoent extends Base {
  @HLogger(constant.CONTEXT) logger: ILogger;

  async deploy(inputs: IInputs, isNasServerStale: boolean) {
    this.logger.debug(`input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(constant.DEPLOY_HELP);
      return;
    }
    await this.initFormatter();

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    if (!isNasServerStale) {
      this.reportComponent('deploy', credentials.AccountID);
    }

    const properties: IProperties = _.cloneDeep(inputs.props);
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    let mountPointDomain: string;
    let fileSystemId = '';
    if (properties.mountPointDomain) {
      mountPointDomain = properties.mountPointDomain;
      this.logger.debug('Specify parameters, reuse configuration.');
    } else {
      const nas = new Nas(properties.regionId, credentials);
      const nasInitResponse = await nas.init(properties);
      this.logger.debug(`Nas init response is: ${JSON.stringify(nasInitResponse)}`);

      mountPointDomain = nasInitResponse.mountTargetDomain;
      fileSystemId = nasInitResponse.fileSystemId;
      super.__report({
        name: 'nas',
        access: inputs.project?.access,
        content: {
          region: properties.regionId,
          mountPointDomain,
          fileSystemId,
        },
      });
    }
    this.logger.debug(`Create nas success, mountPointDomain: ${mountPointDomain}`);

    const mountDir = getMountDir(mountPointDomain, inputs.props.nasDir);
    inputs.props.nasDir = nasUriHandler(inputs.props.nasDir);

    this.logger.debug(`Whether to open the service configuration: ${!isNasServerStale}`);
    inputs.props.mountDir = mountDir;
    const fc = new FcResources(properties.regionId, credentials);
    if (!isNasServerStale) {
      await fc.init(inputs, mountPointDomain);
    } else {
      const { service } = await fc.transformYamlConfigToFcbaseConfig(
        _.cloneDeep(inputs.props),
        mountPointDomain,
        false,
      );
      await FC.makeService(fc.fcClient, service);
    }

    return { mountPointDomain, fileSystemId, mountDir };
  }

  async remove(inputs: IInputs) {
    this.logger.debug(`input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(constant.REOMVE_HELP);
      return;
    }
    await this.initFormatter();

    const { regionId } = inputs.props;
    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    this.reportComponent('remove', credentials.AccountID);

    const fc = new FcResources(regionId, credentials);
    await fc.remove(inputs);

    const nas = new Nas(regionId, credentials);
    const fileSystemId = await nas.remove(inputs.props);
    if (fileSystemId) {
      super.__report({
        name: 'nas',
        access: inputs.project?.access,
        content: {
          region: regionId,
          mountPointDomain: '',
          fileSystemId: '',
        },
      });
    }
  }

  async ls(inputs: IInputs) {
    const apts = { boolean: ['all', 'long', 'help'], alias: { help: 'h', all: 'a', long: 'l' } };
    const { data: commandData = {} }: ICommandParse = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    if (commandData.help) {
      help(constant.LSHELP);
      return;
    }
    await this.initFormatter();

    inputs = await this.handlerInputs(inputs, 'ls');

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
      nasDir: nasDirYmlInput,
      mountDir,
    } = inputs.props;
    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);

    const common = new Common.Ls(regionId, credentials);

    const argv_paras = commandData._ || [];
    const nasDirCommonInput: string = argv_paras[0];
    if (!common.checkLsNasDir(nasDirCommonInput)) {
      help(constant.LSHELP);
      return;
    }

    const isAllOpt: boolean = commandData.all;
    const isLongOpt: boolean = commandData.long;

    await common.ls({
      targetPath: parseNasUri(nasDirCommonInput, mountDir, nasDirYmlInput),
      isAllOpt,
      isLongOpt,
      serviceName,
      functionName,
    });
  }

  async rm(inputs: IInputs) {
    const apts = {
      boolean: ['recursive', 'force', 'help'],
      alias: { recursive: 'r', force: 'f', help: 'h' },
    };
    const { data: commandData = {} }: ICommandParse = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    const argv_paras = commandData._ || [];

    if (commandData.help || !argv_paras[0]) {
      help(constant.RMHELP);
      return;
    }
    await this.initFormatter();

    inputs = await this.handlerInputs(inputs, 'rm');

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
      nasDir: nasDirYmlInput,
      mountDir,
    } = inputs.props;

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    const common = new Common.Rm(regionId, credentials);

    const targetPath = parseNasUri(argv_paras[0], mountDir, nasDirYmlInput);
    const isRootDir = `${mountDir}/.` === targetPath || `${mountDir}/` === targetPath;
    if (isRootDir) {
      this.logger.debug(`Rm root dir, mountDir is ${mountDir}, targetPath is ${targetPath}`);
    }

    await common.rm({
      serviceName,
      functionName,
      isRootDir,
      targetPath: isRootDir ? mountDir : targetPath,
      recursive: commandData.recursive,
      force: commandData.force,
    });
  }

  async cp(inputs: IInputs, command = 'cp') {
    const apts = {
      boolean: ['recursive', 'help', 'no-clobber'],
      alias: { recursive: 'r', 'no-clobber': 'n', help: 'h' },
    };
    const { data: commandData = {} }: ICommandParse = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    const argv_paras = commandData._ || [];
    if (commandData.help || argv_paras.length !== 2) {
      help(constant[`${command.toLocaleUpperCase()}HELP`]);
      return;
    }
    await this.initFormatter();

    inputs = await this.handlerInputs(inputs, command);

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
      nasDir: nasDirYmlInput,
      excludes,
      mountDir,
    } = inputs.props;

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    const common = new Common.Cp(regionId, credentials);
    await common.cp({
      srcPath: argv_paras[0],
      targetPath: argv_paras[1],
      recursive: commandData.r,
      noClobber: commandData.n,
      serviceName,
      functionName,
      noTargetDirectory: true,
      mountDir,
      nasDirYmlInput,
      excludes,
      command,
    });
  }

  async upload(inputs: IInputs) {
    return await this.cp(inputs, 'upload');
  }

  async download(inputs: IInputs) {
    return await this.cp(inputs, 'download');
  }

  async command(inputs: IInputs) {
    const commandData: any = commandParse({ args: inputs.args }, { boolean: ['help'], alias: { help: 'h' } });
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(constant.COMMANDHELP);
      return;
    }
    await this.initFormatter();

    const args = inputs.args.replace('--debug', '').trim();
    inputs = await this.handlerInputs(inputs, 'command');

    const {
      regionId,
      nasDir,
      mountDir,
      serviceName,
      functionName = constant.FUNNAME,
    } = inputs.props;

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);

    const common = new Common.Command(regionId, credentials);

    await common.command({
      serviceName,
      functionName,
      args,
      mountDir,
      nasDir,
    });
  }

  private async getCredential(credentials, access: string) {
    await FcEndpoint.getFcEndpoint();
    this.logger.debug(`fc endpoint: ${FcEndpoint.endpoint}`);
    return _.isEmpty(credentials) ? await getCredential(access) : credentials;
  }

  private reportComponent(command: string, uid: string) {
    reportComponent(constant.CONTEXT_NAME, { uid, command });
  }

  private async handlerInputs(inputs, command?: string) {
    this.logger.debug(`input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    if (command) {
      this.reportComponent(command, credentials.AccountID);
    }

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
    } = inputs.props;

    const isNasServerStale = await Version.isNasServerStale(
      credentials,
      regionId,
      serviceName,
      functionName,
    );
    const { mountDir } = await this.deploy(inputs, isNasServerStale);
    inputs.props.mountDir = mountDir;

    return inputs;
  }

  private async initFormatter() {
    await StdoutFormatter.initStdout();
  }
}
