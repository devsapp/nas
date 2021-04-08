import { ILogger, IV1Inputs, IInputs } from '@serverless-devs/core';
import { ICredentials } from '../../interface';
export default class Resources {
    logger: ILogger;
    fcClient: any;
    profile: ICredentials;
    fcBase: any;
    constructor(regionId: string, profile: ICredentials);
    init(inputs: IV1Inputs, mountPointDomain: string): Promise<void>;
    remove(inputs: IV1Inputs): Promise<void>;
    deployNasService(inputs: IV1Inputs, mountPointDomain: string): Promise<void>;
    deployEnsureNasDir(inputs: IV1Inputs, mountPointDomain: string): Promise<void>;
    transformYamlConfigToFcbaseConfig(inputs: any, mountPointDomain: string, isEnsureNasDirExist: boolean): Promise<IInputs>;
    invokeFcUtilsFunction(serviceName: string, functionName: string, event: string): Promise<void>;
}
