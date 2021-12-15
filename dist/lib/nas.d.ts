import { ICredentials, IDeployProps, IRemoveProps, IVpcConfig } from '../interface';
interface FileSystemKey {
    fileSystemId: string;
    mountTargetDomain?: string;
}
export default class Nas {
    static checkDeployProps(props: IDeployProps): void;
    readonly assumeYes: boolean;
    readonly nasClient: any;
    readonly regionId: string;
    constructor(regionId: string, profile: ICredentials, assumeYes: boolean);
    /**
     * 创建 nas 资源
     * @param props 参考 IDeployProps 声明
     * @returns .
     */
    init(props: IDeployProps): Promise<{
        fileSystemId: string;
        mountPointDomain: string;
    }>;
    /**
     * 删除 nas
     * @param props
     *  如果 props.fileSystemId 则删除指定的 nas
     *  如果 props.nasName 存在，则通过 nasName, zoneId, vpcConfig 查找符合条件的 nas 删除
     */
    remove(props: IRemoveProps): Promise<{
        fileSystemId?: undefined;
        mountPointDomains?: undefined;
    } | {
        fileSystemId: string;
        mountPointDomains: any[];
    }>;
    findNasFileSystem(nasName: string, zoneId?: string, vpcConfig?: IVpcConfig): Promise<FileSystemKey>;
    private removeAccordingToFileSystemId;
    private getNasFileSystems;
    private createNasFileSystem;
    private createMountTarget;
    private getStorageType;
    private findFileSystemWithVpcConfig;
    private waitMountPointUntilAvaliable;
    private DescribeFileSystems;
    private deleteMountTarget;
    private deleteLifecyclePolicy;
    private deleteFileSystem;
}
export {};
