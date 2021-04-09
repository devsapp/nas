import { ILogger } from '@serverless-devs/core';
import { IInputs, ICredentials } from '../../interface';
export default class Resources {
    logger: ILogger;
    fcClient: any;
    profile: ICredentials;
    fcBase: any;
    constructor(regionId: string, profile: ICredentials);
    init(inputs: IInputs, mountPointDomain: string): Promise<void>;
    remove(inputs: IInputs): Promise<void>;
    deployNasService(inputs: IInputs, mountPointDomain: string): Promise<void>;
    deployEnsureNasDir(inputs: IInputs, mountPointDomain: string): Promise<void>;
    transformYamlConfigToFcbaseConfig(inputs: IInputs, mountPointDomain: string, isEnsureNasDirExist: boolean): Promise<any>;
    invokeFcUtilsFunction(serviceName: string, functionName: string, event: string): Promise<void>;
}
