import { ILogger } from '@serverless-devs/core';
import { IProperties, ICredentials, INasInitResponse } from '../interface';
export default class Nas {
    logger: ILogger;
    nasClient: any;
    stdoutFormatter: any;
    constructor(regionId: any, profile: ICredentials);
    init(properties: IProperties): Promise<INasInitResponse>;
    remove(properties: IProperties): Promise<void>;
    findNasFileSystem(regionId: string, description: string): Promise<undefined | string>;
    findMountTarget(region: string, fileSystemId: string, vpcId: string, vSwitchId: string): Promise<string | null>;
    createNasFileSystem(regionId: string, zoneId: string, description: string, storageType?: string): Promise<any>;
    createMountTarget(region: string, fileSystemId: string, vpcId: string, vSwitchId: string): Promise<string>;
    getStorageType(zones: any[], zoneId: string, region: string, storageType?: string): Promise<string>;
    waitMountPointUntilAvaliable(region: string, fileSystemId: string, mountTargetDomain: string): Promise<void>;
}
