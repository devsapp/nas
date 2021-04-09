import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
export default class NasCompoent {
    logger: ILogger;
    deploy(inputs: IInputs, isNasServerStale: boolean): Promise<{
        mountPointDomain: string;
        fileSystemId: string;
        mountDir: string;
    }>;
    remove(inputs: IInputs): Promise<void>;
    ls(inputs: IInputs): Promise<void>;
    rm(inputs: IInputs): Promise<void>;
    cp(inputs: IInputs): Promise<void>;
}
