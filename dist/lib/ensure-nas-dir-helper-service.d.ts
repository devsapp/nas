import { IInputs, IMountPoints, EnsureNasDirHelperServiceInputs, RemoveHelperServiceInputs } from '../interface';
import FcDeploy from './fc-deploy';
export default class EnsureNasDirHelperService extends FcDeploy {
    /**
     * 处理 mountPoints 参数
     * @param mountPoints 主函数服务的 nas 配置
     * @returns
     *  mountPoints 主函数挂载 nas 根目录的配置
     *  mappingDirPaths 需要创建 nas 目录在辅助函数中的目录映射
     */
    static handlerMountPoint(mountPoints: IMountPoints): {
        mountPoints: IMountPoints;
        mappingDirPaths: string[];
    };
    /**
     * 生成 fc-deploy 支持的入参配置
     * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
     * @returns .
     */
    static genDeployComponentInputs(inputs: EnsureNasDirHelperServiceInputs): IInputs;
    /**
     * 初始化辅助函数，并且确保目录存在
     * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
     */
    init(inputs: EnsureNasDirHelperServiceInputs): Promise<void>;
    remove(inputs: RemoveHelperServiceInputs): Promise<void>;
    private createNasDirectory;
}
