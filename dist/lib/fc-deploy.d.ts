import { IInputs, INasConfig, IVpcConfig } from '../interface';
export default class FcDeploy {
    static genComponentInputs(inputs: any, props: any): IInputs;
    accountId: string;
    region: string;
    fcClient: any;
    constructor(credentials: any, regionId: string);
    deploy(inputs: IInputs): Promise<any>;
    remove(inputs: IInputs): Promise<any>;
    getState(name: any): Promise<any>;
    versionOrConfigNoChange(serviceName: string, version: string, vpcConfig: IVpcConfig, nasConfig: INasConfig): Promise<boolean>;
}
