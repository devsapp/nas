import {
  HLogger,
  ILogger,
  getCredential,
  help,
  commandParse,
} from '@serverless-devs/core';
import _ from 'lodash';
import * as constant from './constant';
import { IInputs, IProperties, ICommandParse } from './interface';
import Nas from './utils/nas';
import Common from './utils/common';
import Version from './utils/version';
import FcResources from './utils/fcResources';
import { getMountDir, nasUriHandler } from './utils/utils';
import { parseNasUri } from './utils/common/utils';

export default class NasCompoent {
  @HLogger(constant.CONTEXT) logger: ILogger;

  async deploy(inputs: IInputs, isNasServerStale: boolean) {
    this.logger.debug('Create nas start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(constant.HELP);
      return;
    }

    const credentials = await getCredential(inputs.credentials?.Alias);

    const properties: IProperties = _.cloneDeep(inputs.props);
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    let mountPointDomain: string;
    let fileSystemId = '';
    if (properties.mountPointDomain) {
      mountPointDomain = properties.mountPointDomain;
      this.logger.info(`Specify parameters, reuse configuration.`);
    } else {
      const nas = new Nas(properties.regionId, credentials);
      const nasInitResponse = await nas.init(properties);
      this.logger.debug(`Nas init response is: ${JSON.stringify(nasInitResponse)}`);

      mountPointDomain = nasInitResponse.mountTargetDomain;
      fileSystemId = nasInitResponse.fileSystemId;
    }
    this.logger.debug(`Create nas success, mountPointDomain: ${mountPointDomain}`);

    const mountDir = getMountDir(mountPointDomain, inputs.props.nasDir);
    inputs.props.nasDir = nasUriHandler(inputs.props.nasDir);

    this.logger.debug(`Whether to open the service configuration: ${!isNasServerStale}`);
    if (!isNasServerStale) {
      inputs.props.mountDir = mountDir;
      const fc = new FcResources(properties.regionId, credentials);
      await fc.init(inputs, mountPointDomain);
    }

    return { mountPointDomain, fileSystemId, mountDir };
  }

  async remove(inputs: IInputs) {
    this.logger.debug('Remove nas start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(constant.HELP);
      return;
    }

    const regionId = inputs.props.regionId;
    const credentials = await getCredential(inputs.credentials?.Alias);

    const fc = new FcResources(regionId, credentials);
    await fc.remove(inputs);

    const nas = new Nas(regionId, credentials);
    await nas.remove(inputs.props);
  }

  async ls(inputs: IInputs) {
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['all', 'long', 'help'], alias: { help: 'h', all: 'a', long: 'l' } };
    const { data: commandData = {} }: ICommandParse = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    if (commandData.help) {
      help(constant.LSHELP);
      return;
    }

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
      nasDir: nasDirYmlInput,
    } = inputs.props;
    const credentials = await getCredential(inputs.credentials?.Alias);

    const isNasServerStale = await Version.isNasServerStale(
      credentials,
      regionId,
      serviceName,
      functionName,
    );

    const { mountDir } = await this.deploy(inputs, isNasServerStale);

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
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

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

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
      nasDir: nasDirYmlInput,
    } = inputs.props;
    const credentials = await getCredential(inputs.credentials?.Alias);

    const isNasServerStale = await Version.isNasServerStale(
      credentials,
      regionId,
      serviceName,
      functionName,
    );
    const { mountDir } = await this.deploy(inputs, isNasServerStale);

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

  async cp(inputs: IInputs) {
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = {
      boolean: ['recursive', 'help', 'no-clobber'],
      alias: { recursive: 'r', 'no-clobber': 'n', help: 'h' },
    };
    const { data: commandData = {} }: ICommandParse = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    const argv_paras = commandData._ || [];
    if (commandData.help || argv_paras.length !== 2) {
      help(constant.CPHELP);
      return;
    }

    const {
      regionId,
      serviceName,
      functionName = constant.FUNNAME,
      nasDir: nasDirYmlInput,
      excludes,
    } = inputs.props;
    const credentials = await getCredential(inputs.credentials?.Alias);

    const isNasServerStale = await Version.isNasServerStale(
      credentials,
      regionId,
      serviceName,
      functionName,
    );
    const { mountDir } = await this.deploy(inputs, isNasServerStale);

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
    });
  }
}
