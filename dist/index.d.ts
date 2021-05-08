import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
export default class NasCompoent {
    logger: ILogger;
    deleteCredentials(inputs: any): void;
    reportComponent(command: string, uid: string): void;
    handlerInputs(inputs: any, command?: string): Promise<any>;
    deploy(inputs: IInputs, isNasServerStale: boolean): Promise<{
        mountPointDomain: string;
        fileSystemId: string;
        mountDir: string;
    }>;
    remove(inputs: IInputs): Promise<void>;
    ls(inputs: IInputs): Promise<void>;
    rm(inputs: IInputs): Promise<void>;
    cp(inputs: IInputs, command?: string): Promise<void>;
    upload(inputs: IInputs): Promise<void>;
    download(inputs: IInputs): Promise<void>;
    command(inputs: IInputs): Promise<void>;
}
