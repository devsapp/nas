import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
import Base from './common/base';
export default class NasCompoent extends Base {
    logger: ILogger;
    deploy(inputs: IInputs, isNasServerStale: boolean): Promise<{
        mountPointDomain: string;
        fileSystemId: string;
        mountDir: string;
    }>;
    /**
     * 初始化辅助函数，并且确保目录存在
     * @param inputs 参数对标 deploy
     */
    initHelperService(inputs: IInputs): Promise<void>;
    /**
     * 删除辅助函数
     * @param inputs .
     */
    removeHelperService(inputs: IInputs): Promise<void>;
    /**
     * 确保目录存在
     * @param inputs 参数对标 deploy
     */
    ensureNasDir(inputs: IInputs): Promise<void>;
    /**
     * 删除确保目录存在的辅助函数
     * @param inputs 参数对标 deploy
     */
    removeEnsureNasDirHelperService(inputs: IInputs): Promise<void>;
    remove(inputs: IInputs): Promise<void>;
    ls(inputs: IInputs): Promise<void>;
    rm(inputs: IInputs): Promise<void>;
    cp(inputs: IInputs, command?: string): Promise<void>;
    upload(inputs: IInputs): Promise<void>;
    download(inputs: IInputs): Promise<void>;
    command(inputs: IInputs): Promise<void>;
    private reportComponent;
    private handlerInputs;
    private initFormatter;
}
