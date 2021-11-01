import CommandBase from './command-base';
import { ICommandProps } from '../../interface';
interface IApts {
    localDir: string;
    fcDir: string;
    noUnzip: boolean;
    noClobber: boolean;
}
export default class Download extends CommandBase {
    cpFromNasToLocal(props: ICommandProps, apts: IApts, configPath: string): Promise<void>;
    /**
     * 下载文件夹
     * @param serviceName 服务名称
     * @param stat 远端文件的信息
     * @param fcDir 远端文件路径
     * @param localDir 本地文件路径
     * @param noClobber 不强制覆盖文件
     * @param noUnzip 是否解压文件
     */
    private downloadDir;
    /**
     * 下载文件
     * @param serviceName 服务名称
     * @param stat 远端文件的信息
     * @param localDir 本地文件路径
     * @param fileName 本地文件名称
     * @param noClobber 不覆盖文件
     * @returns void
     */
    private downloadFile;
    private writeBufToFile;
}
export {};
