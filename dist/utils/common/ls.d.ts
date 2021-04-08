import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../../interface';
interface ILs {
    targetPath: string;
    isAllOpt: boolean;
    isLongOpt: boolean;
    serviceName: string;
    functionName: string;
}
export default class Ls {
    fcClient: any;
    logger: ILogger;
    constructor(regionId: string, credentials: ICredentials);
    ls(options: ILs): Promise<void>;
    checkLsNasDir(targetPath: string): boolean;
}
export {};
