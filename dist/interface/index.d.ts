import { InitHelperServiceProps, RemoveHelperServiceProps, IRemoveProps, IDeployProps, ICommandProps } from './props';
export * from './props';
export * from './resource';
export interface IInputs {
    props: any;
    credentials?: ICredentials;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    appName: string;
    args: string;
    path: any;
}
export interface DeployInputs extends IInputs {
    props: IDeployProps;
}
export interface RemoveInputs extends IInputs {
    props: IRemoveProps;
}
export interface CommandInputs extends IInputs {
    props: ICommandProps;
}
export interface EnsureNasDirHelperServiceInputs extends IInputs {
    props: InitHelperServiceProps;
}
export interface NasOperationInitHelperServiceInputs extends IInputs {
    props: InitHelperServiceProps;
}
export interface RemoveHelperServiceInputs extends IInputs {
    props: RemoveHelperServiceProps;
}
export interface ICredentials {
    Alias: string;
    AccountID: string;
    AccessKeyID: string;
    AccessKeySecret: string;
    SecurityToken?: string;
}
