import { IInputs, NasOperationInitHelperServiceInputs, RemoveHelperServiceInputs } from '../interface';
import FcDeploy from './fc-deploy';
export declare const getServiceName: (name: string) => string;
export declare const NAS_OPERATION_HELPER_FUNCTION_NAME = "nas_dir_checker";
export default class NasOperationInitHelperService extends FcDeploy {
    /**
     * 生成 fc-deploy 支持的入参配置
     * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
     * @returns .
     */
    static genDeployComponentInputs(inputs: NasOperationInitHelperServiceInputs): IInputs;
    /**
     * 初始化辅助函数，并且确保目录存在
     * @param inputs 查看声明 EnsureNasDirHelperServiceInputs
     */
    init(inputs: NasOperationInitHelperServiceInputs): Promise<void>;
    remove(inputs: RemoveHelperServiceInputs): Promise<void>;
}
