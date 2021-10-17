import _ from 'lodash';

export interface IVpcConfig {
  vpcId: string;
  vSwitchIds: string[];
  securityGroupId: string;
}
export function isVpcConfig(args: any): args is IVpcConfig {
  if (_.isEmpty(args)) {
    return false;
  }
  return _.isString(args.vpcId) && _.isArray(args.vSwitchIds) && _.isString(args.securityGroupId);
}

export interface IMountPoint {
  serverAddr: string;
  nasDir: string;
  fcDir: string;
}

export type IMountPoints = IMountPoint[];

export interface INasConfig {
  userId: number;
  groupId: number;
  mountPoints: IMountPoints;
}
