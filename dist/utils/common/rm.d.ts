import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../../interface';
interface IRm {
    targetPath: string;
    recursive: boolean;
    force: boolean;
    isRootDir: boolean;
    serviceName: string;
    functionName: string;
}
interface INasId {
    UserId: number;
    GroupId: number;
}
export default class Ls {
    fcClient: any;
    logger: ILogger;
    constructor(regionId: string, credentials: ICredentials);
    rm(options: IRm): Promise<void>;
    getNasConfig(serviceName: string): Promise<INasId>;
    statsRequest(dstPath: string, httpTriggerPath: string): Promise<any>;
}
export {};
