import _ from 'lodash';
import { IVpcConfig, IMountPoints } from './resource';

export interface InitHelperServiceProps {
  regionId: string;
  serviceName: string; // 主函数的服务名称
  description?: string;
  role?: string; // 不填写遵循 fc-deploy 的逻辑
  vpcConfig: IVpcConfig;
  groupId?: number;
  userId?: number;
  mountPoints: IMountPoints;
}

export interface RemoveHelperServiceProps {
  regionId: string;
  serviceName: string; // 主函数的服务名称
}
export function isRemoveHelperServiceProps(args: any): args is RemoveHelperServiceProps {
  return (_.isString(args?.regionId) && _.isString(args?.serviceName));
}

export interface IDeployProps {
  regionId: string;
  serviceName: string; // 主函数的服务名称
  description?: string;
  role?: string; // 不填写遵循 fc-deploy 的逻辑
  vpcConfig: IVpcConfig;
  groupId?: number;
  userId?: number;
  mountPoints?: IMountPoints;
  nasName?: string;
  zoneId?: string;
  storageType?: string;
  nasDir?: string;
}

export interface IRemoveProps {
  regionId: string;
  // 主函数的服务名称，传入则删除辅助函数
  serviceName?: string;
  // 传入 nasName 删除文件系统
  nasName?: string;
  zoneId?: string;
  vpcConfig?: IVpcConfig;
  // 传入 fileSystemId 删除文件系统
  fileSystemId?: string;
  // TODO: 传入 mountPointDomain 删除挂载点(暂不实行)
  // mountPointDomain?: string | string[];
}

export interface ICommandProps {
  regionId: string;
  serviceName: string; // 主函数的服务名称
  role?: string; // 不填写遵循 fc-deploy 的逻辑
  description?: string;
  vpcConfig: IVpcConfig;
  groupId?: number;
  userId?: number;
  mountPoints: IMountPoints;
}
