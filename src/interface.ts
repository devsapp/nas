export interface IInputs {
  props: IProperties;
  credentials: ICredentials;
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

export interface IProperties {
  regionId: string;
  serviceName: string;
  functionName?: string;
  vpcId: string;
  vSwitchId: string;
  securityGroupId: string;
  role: string;
  description?: string;

  groupId: number;
  userId: number;
  nasName?: string;
  mountPointDomain?: string;
  zoneId: string;
  storageType?: string;
  fileSystemId?: string;
  excludes?: string[];
  nasDir: string;
  mountDir?: string;
}

export interface INasInitResponse {
  fileSystemId: string;
  mountTargetDomain: string;
}

export interface ICommandParse {
  rawData?: string;
  data?: ICommandData;
}

export interface ICommandData {
  [key: string]: any;
}

