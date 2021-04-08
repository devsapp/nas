import { ILogger, IV1Inputs } from '@serverless-devs/core';
import { ICredentials } from './interface';
export default class NasCompoent {
    logger: ILogger;
    getCredentials(credentials: {} | ICredentials, provider: string, accessAlias?: string): Promise<ICredentials>;
    deploy(inputs: IV1Inputs, isNasServerStale: boolean): Promise<{
        mountPointDomain: string;
        fileSystemId: string;
        mountDir: string;
    }>;
    remove(inputs: IV1Inputs): Promise<void>;
    ls(inputs: IV1Inputs): Promise<void>;
    rm(inputs: IV1Inputs): Promise<void>;
    cp(inputs: IV1Inputs): Promise<void>;
}
