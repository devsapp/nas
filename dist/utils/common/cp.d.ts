/// <reference types="node" />
import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../../interface';
interface ICp {
    srcPath: string;
    targetPath: string;
    recursive: boolean;
    noClobber: boolean;
    serviceName: string;
    functionName: string;
    noTargetDirectory: boolean;
    mountDir: string;
    nasDirYmlInput: string;
    excludes: undefined | string[];
}
interface INasId {
    UserId: number;
    GroupId: number;
}
interface IDstStats {
    dstPath: string;
    resolvedDst: string;
    dstPathEndWithSlash: boolean;
    dstPathExists: boolean;
    parentDirOfDstPathExists: boolean;
    dstPathIsDir: boolean;
    dstPathIsFile: boolean;
}
export default class Cp {
    fcClient: any;
    logger: ILogger;
    constructor(regionId: string, credentials: ICredentials);
    cp(options: ICp): Promise<void>;
    cpFromNasToLocal(nasPath: string, localDir: string, serviceName: string, functionName: string, mountDir: string, nasDirYmlInput: string): Promise<void>;
    cpFromLocalToNas(options: ICp): Promise<void>;
    uploadFolder(resolvedSrc: string, actualDstPath: string, nasHttpTriggerPath: string, srcPath: string, noClobber: boolean, excludes?: string[]): Promise<void>;
    uploadFile(resolvedSrc: string, actualDstPath: string, nasHttpTriggerPath: string, fileHash?: string): Promise<void>;
    sendCleanRequest(nasHttpTriggerPath: any, nasZipFile: any): Promise<any>;
    checkFileHash(nasHttpTriggerPath: string, nasFile: string, fileHash: string): Promise<any>;
    changeNasFilePermission(nasHttpTriggerPath: string, filePath: string, filePermission: string): Promise<any>;
    readFileChunk(filePath: string, start: number, size: number): Promise<Buffer>;
    getFilePermission(filePath: string): Promise<string>;
    checkCpDstPath(nasHttpTriggerPath: string, srcPath: string, dstStats: IDstStats, recursive: boolean, noClobber: boolean, noTargetDirectory: boolean): any;
    statsRequest(dstPath: string, httpTriggerPath: string): Promise<any>;
    getNasConfig(serviceName: string): Promise<INasId>;
    getFileHash(filePath: string): Promise<string>;
    uploadFileByChunk(nasHttpTriggerPath: string, nasZipFile: string, zipFilePath: string, fileOffSet: any[]): Promise<unknown>;
    unzipNasFileParallel(nasHttpTriggerPath: string, dstDir: string, nasZipFile: string, filesArrQueue: any[], noClobber: boolean): Promise<unknown>;
    endWithSlash(inputPath: string): boolean;
    isCpFromLocalToNas(srcPath: string, targetPath: string): boolean;
    isCpFromNasToLocal(srcPath: string, targetPath: string): boolean;
}
export {};
