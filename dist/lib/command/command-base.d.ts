import { ICredentials } from '../../interface';
export default class CommandBase {
    credentials: ICredentials;
    region: string;
    fcClient: any;
    constructor(credentials: any, regionId: string);
    getChunkFileUploadReqPath(serviceName: string): string;
    callCommands(serviceName: string, cmd: string): Promise<any>;
    callStats(serviceName: string, dstPath: string): Promise<any>;
    callFileCheck(serviceName: string, dstPath: string, fileHash: string): Promise<any>;
    callTmpCheck(serviceName: string, dstPath: string): Promise<any>;
    callClean(serviceName: string, nasZipFile: string): Promise<any>;
    callPathExsit(serviceName: string, targetPath: string): Promise<any>;
    callDownload(serviceName: string, tmpNasZipPath: string): Promise<any>;
}
