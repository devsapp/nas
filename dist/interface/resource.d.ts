export interface IVpcConfig {
    vpcId: string;
    vSwitchIds: string[];
    securityGroupId: string;
}
export declare function isVpcConfig(args: any): args is IVpcConfig;
export interface IMountPoint {
    serverAddr: string;
    nasDir: string;
    fcDir: string;
}
export declare type IMountPoints = IMountPoint[];
export interface INasConfig {
    userId: number;
    groupId: number;
    mountPoints: IMountPoints;
}
