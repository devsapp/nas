import { ICommandProps } from '../../interface';
import CommandBase from './command-base';
interface IApts {
    localDir: string;
    fcDir: string;
    recursive: boolean;
    noClobber: boolean;
}
export default class Upload extends CommandBase {
    cpFromLocalToNas(props: ICommandProps, apts: IApts): Promise<void>;
    /**
     * 上传文件夹
     * @param localResolvedSrc 本地代码包地址
     * @param actualDstPath 目标地址
     * @param serviceName 主函数的服务名称
     * @param noClobber 不覆盖
     */
    uploadFolder(localResolvedSrc: string, actualDstPath: string, serviceName: string, noClobber: boolean): Promise<void>;
    /**
     * 上传文件
     * @param localResolvedSrc 本地代码包地址
     * @param actualDstPath 目标地址
     * @param serviceName 主函数的服务名称
     * @param fileHash 文件hash值
     */
    private uploadFile;
    /**
     * 解压 nas 的文件
     * @param serviceName 主函数的服务名称
     * @param dstDir 解压的目标地址
     * @param nasZipFile 解压的文件地址
     * @param filesArrQueue 解压的队列
     * @param noClobber 是否覆盖
     * @returns Promise<viod>
     */
    private unzipNasFileParallel;
    /**
     * 按块上传文件
     * @param serviceName 服务名称，用于计算辅助函数的 http 地址
     * @param nasZipFile 上传到 nas 的文件名称
     * @param zipFilePath 本地的压缩包
     * @param fileOffSet 计算的切片
     * @returns void
     */
    private uploadFileByChunk;
    /**
     * 检测上传地址可用性
     */
    private checkUploadDstPath;
    /**
     * 检测上传地址是否可写
     */
    private checkWritePerm;
}
export {};
