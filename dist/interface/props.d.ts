import { IVpcConfig, IMountPoints } from './resource';
export interface InitHelperServiceProps {
    regionId: string;
    serviceName: string;
    description?: string;
    role?: string;
    vpcConfig: IVpcConfig;
    groupId?: number;
    userId?: number;
    mountPoints: IMountPoints;
}
export interface RemoveHelperServiceProps {
    regionId: string;
    serviceName: string;
}
export declare function isRemoveHelperServiceProps(args: any): args is RemoveHelperServiceProps;
export interface IDeployProps {
    regionId: string;
    serviceName: string;
    description?: string;
    role?: string;
    vpcConfig: IVpcConfig;
    groupId?: number;
    userId?: number;
    mountPoints?: IMountPoints;
    nasName?: string;
    zoneId?: string;
    storageType?: string;
    nasDir?: string;
}
export interface IRemoveProps {
    regionId: string;
    serviceName?: string;
    nasName?: string;
    zoneId?: string;
    vpcConfig?: IVpcConfig;
    fileSystemId?: string;
}
export interface ICommandProps {
    regionId: string;
    serviceName: string;
    role?: string;
    description?: string;
    vpcConfig: IVpcConfig;
    groupId?: number;
    userId?: number;
    mountPoints: IMountPoints;
}
