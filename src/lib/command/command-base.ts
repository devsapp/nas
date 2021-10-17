import { ICredentials } from '../../interface';
import FcClient from '../utils/client';
import { getServiceName, NAS_OPERATION_HELPER_FUNCTION_NAME } from '../nas-operation-helper-service';

export default class CommandBase {
  credentials: ICredentials;
  region: string;
  fcClient: any;

  constructor(credentials, regionId: string) {
    this.credentials = credentials;
    this.region = regionId;

    this.fcClient = FcClient(regionId, credentials);
  }

  getChunkFileUploadReqPath(serviceName: string): string {
    return `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/file/chunk/upload`;
  }

  async callCommands(serviceName: string, cmd: string): Promise<any> {
    const p = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/commands`;
    return await this.fcClient.post(p, { cmd });
  }

  async callStats(serviceName: string, dstPath: string) {
    const urlPath = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/stats`;
    const query = { dstPath };
    return await this.fcClient.get(urlPath, query);
  }

  async callFileCheck(serviceName: string, dstPath: string, fileHash: string) {
    const query = { nasFile: dstPath, fileHash };
    const urlPath = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/file/check`;
    return await this.fcClient.get(urlPath, query);
  }

  async callTmpCheck(serviceName: string, dstPath: string) {
    const urlPath = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/tmp/check`;
    return await this.fcClient.get(urlPath, { remoteNasTmpDir: dstPath });
  }

  async callClean(serviceName: string, nasZipFile: string) {
    const urlPath = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/clean`;
    const query = { nasZipFile };
    return await this.fcClient.get(urlPath, query);
  }

  async callPathExsit(serviceName: string, targetPath: string) {
    const urlPath = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/path/exsit`;
    const query = { targetPath };
    return await this.fcClient.get(urlPath, query);
  }

  async callDownload(serviceName: string, tmpNasZipPath: string) {
    const urlPath = `/proxy/${getServiceName(serviceName)}/${NAS_OPERATION_HELPER_FUNCTION_NAME}/download`;
    return await this.fcClient.post(urlPath, { tmpNasZipPath }, {}, {}, { rawBuf: true });
  }
}
