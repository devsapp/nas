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

export interface ICredentials {
  Alias: string;
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface IVpcConfig {
  vpcId: string;
  vSwitchId: string[] | string; // 支持数组和字符串
  securityGroupId: string;
}

// export interface IProperties {
//   regionId: string;
//   serviceName: string;
//   functionName?: string;
//   vpcId: string;
//   vSwitchId: string[] | string; // 支持数组和字符串，如果是在创建nas的时候传入的是数组，则使用第一个元素作为挂在点的交换机
//   securityGroupId: string;
//   role: string;
//   description?: string;

//   groupId: number;
//   userId: number;
//   nasName?: string;
//   mountPointDomain?: string;
//   zoneId: string;
//   storageType?: string;
//   fileSystemId?: string;
//   excludes?: string[];
//   nasDir: string;
//   mountDir?: string;
// }

// export interface INasInitResponse {
//   fileSystemId: string;
//   mountTargetDomain: string;
// }

// export interface ICommandParse {
//   rawData?: string;
//   data?: ICommandData;
// }

// export interface ICommandData {
//   [key: string]: any;
// }
