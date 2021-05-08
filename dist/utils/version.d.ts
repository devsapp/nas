import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../interface';
export default class Version {
    static logger: ILogger;
    static isNasServerStale(profile: ICredentials, regionId: string, serviceName: string, functionName: string): Promise<boolean>;
    static getVersion(): Promise<any>;
}
