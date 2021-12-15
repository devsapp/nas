import Base from './common/base';
import { IInputs, RemoveInputs, CommandInputs, EnsureNasDirHelperServiceInputs, RemoveHelperServiceInputs, DeployInputs } from './interface';
export default class NasCompoent extends Base {
    /**
     * 创建 nas 资源，并创建辅助函数
     * @param inputs props 参数参考 IDeployProps
     */
    deploy(inputs: DeployInputs): Promise<{
        mountPoints: import("./interface").IMountPoints;
    }>;
    /**
     * 删除 nas 资源，并删除辅助函数
     * @param inputs .
     */
    remove(inputs: RemoveInputs): Promise<void>;
    /**
     * 调用 fc 的内置指令
    */
    command(inputs: CommandInputs): Promise<any>;
    /**
     * 下载文件到本地
    */
    download(inputs: IInputs): Promise<any>;
    /**
     * 上传文件到 nas
    */
    upload(inputs: IInputs): Promise<any>;
    /**
     * 初始化辅助函数，并且确保目录存在
     * @param inputs props 参数参考 HelperServiceProps
     */
    initHelperService(inputs: IInputs): Promise<void>;
    /**
     * 创建确保 nas 目录存在的辅助函数，并确保目录存在
     * @param inputs .
     */
    ensureNasDir(inputs: EnsureNasDirHelperServiceInputs): Promise<void>;
    /**
     * 删除辅助函数
     * @param inputs .
     */
    removeHelperService(inputs: RemoveHelperServiceInputs): Promise<void>;
    /**
     * 删除确保 nas 目录存在的辅助函数
     * @param inputs .
     */
    removeEnsureNasDirHelperService(inputs: RemoveHelperServiceInputs): Promise<void>;
    private reportComponent;
}
