
import _ from 'lodash';
import { nasClient } from './utils/client';
import { ICredentials, IDeployProps, IRemoveProps, isVpcConfig, IVpcConfig } from '../interface';
import logger from '../common/logger';
import { promptForConfirmContinue, sleep } from './utils/utils';
import { writeCreatCache } from './utils/write-creat-cache';

const REQUESTOPTION = {
  method: 'POST',
};

interface FileSystemKey {
  fileSystemId: string;
  mountTargetDomain?: string;
}

export default class Nas {
  static checkDeployProps(props: IDeployProps) {
    const {
      regionId,
      serviceName,
      vpcConfig,
      zoneId,
    } = props;
    if (_.isEmpty(regionId)) {
      throw new Error('Parameter is missing regionId');
    }
    if (_.isEmpty(serviceName)) {
      throw new Error('Parameter is missing serviceName');
    }
    if (!isVpcConfig(vpcConfig)) {
      throw new Error(`The parameter vpcConfig does not meet expectations: \n${JSON.stringify(vpcConfig || {}, null, 2)}`);
    }
    if (_.isEmpty(props?.mountPoints) && _.isEmpty(zoneId)) {
      throw new Error('Parameter is missing zoneId');
    }
  }

  readonly assumeYes: boolean;
  readonly nasClient: any;
  readonly regionId: string;
  readonly accountID: string;
  readonly serviceName: string;
  readonly configPath: string;

  constructor(regionId: string, profile: ICredentials, assumeYes: boolean, serviceName?: string, configPath?: string) {
    this.regionId = regionId;
    this.accountID = profile.AccountID;
    this.serviceName = serviceName;
    this.configPath = configPath;
    this.assumeYes = assumeYes;
    this.nasClient = nasClient(regionId, profile);
  }

  /**
   * 创建 nas 资源
   * @param props 参考 IDeployProps 声明
   * @returns .
   */
  async init(props: IDeployProps) {
    const {
      regionId,
      vpcConfig,
      nasName,
      zoneId,
      storageType,
    } = props;
    let { fileSystemId, mountTargetDomain } = (await this.findNasFileSystem(nasName, zoneId, vpcConfig)) || {};

    await logger.task('Creating', [
      {
        title: `Creating NasFileSystem: ${nasName}`,
        id: 'NasFileSystem',
        enabled: () => _.isEmpty(fileSystemId),
        task: async () => {
          fileSystemId = await this.createNasFileSystem(regionId, zoneId, nasName, storageType);
          logger.debug(
            `Default nas file system has been generated, fileSystemId is: ${fileSystemId}`,
          );
        },
      },
      {
        title: () => `Creating MountTarget: ${fileSystemId}`,
        id: 'MountTarget',
        enabled: () => _.isEmpty(mountTargetDomain),
        task: async () => {
          mountTargetDomain = await this.createMountTarget(
            fileSystemId,
            vpcConfig.vpcId,
            vpcConfig.vSwitchIds[0],
          );
          logger.debug(
            `Default nas file system mount target has been generated, mount domain is: ${mountTargetDomain}`,
          );
        },
      },
    ]);

    return {
      fileSystemId,
      mountPointDomain: mountTargetDomain,
    };
  }

  /**
   * 删除 nas
   * @param props
   *  如果 props.fileSystemId 则删除指定的 nas
   *  如果 props.nasName 存在，则通过 nasName, zoneId, vpcConfig 查找符合条件的 nas 删除
   */
  async remove(props: IRemoveProps) {
    const { fileSystemId, nasName, zoneId, vpcConfig } = props;
    if (fileSystemId) {
      return await this.removeAccordingToFileSystemId(fileSystemId);
    } else if (nasName) {
      const { fileSystemId: id } = (await this.findNasFileSystem(nasName, zoneId, vpcConfig)) || {};
      return await this.removeAccordingToFileSystemId(id);
    } else {
      logger.debug('Not found nasName or fileSystemId,skip remove nas.');
    }
  }

  async findNasFileSystem(nasName: string, zoneId?: string, vpcConfig?: IVpcConfig): Promise<FileSystemKey> {
    const fileSystems = await this.getNasFileSystems({ description: nasName, zoneId });

    if (!_.isEmpty(fileSystems)) {
      const findRs = this.findFileSystemWithVpcConfig(fileSystems, vpcConfig);
      logger.debug(`findFileSystemWithVpcConfig res: ${JSON.stringify(findRs)}`);
      return findRs;
    }
  }

  private async removeAccordingToFileSystemId(fileSystemId: string) {
    const mountPointDomains = [];
    if (!fileSystemId) {
      logger.warn(`Not found fileSystemId: ${fileSystemId}`);
      return {};
    }

    const { TotalCount, FileSystems } = await this.DescribeFileSystems({ FileSystemId: fileSystemId });
    if (TotalCount === 0) {
      logger.warn(`Reminder Nas: FileSystem(${fileSystemId}) was not found, skip remove`);
      return {};
    }

    for (const { MountTargets } of FileSystems.FileSystem) {
      if (!_.isEmpty(MountTargets?.MountTarget)) {
        for (const { MountTargetDomain } of MountTargets.MountTarget) {
          await this.deleteMountTarget(fileSystemId, MountTargetDomain);
          mountPointDomains.push(MountTargetDomain);
        }
      }
    }

    await this.deleteFileSystem(fileSystemId);

    return {
      fileSystemId,
      mountPointDomains,
    };
  }

  private async getNasFileSystems({ description, zoneId }: { description: string; zoneId?: string }): Promise<any> {
    const pageSize = 100;
    let requestPageNumber = 0;
    let totalCount: number;
    let pageNumber: number;

    // 符合的条件
    // 如果 mountPointDomain 不存在，description 必须要相等
    // 参数如果存在 zoneId，也需要相等
    const expectedFileSystems = [];
    const needFilterZoneId = !_.isEmpty(zoneId);

    do {
      const params = {
        RegionId: this.regionId,
        PageSize: pageSize,
        PageNumber: ++requestPageNumber,
      };


      logger.debug(`DescribeFileSystems request pageNumber: ${requestPageNumber}`);
      const rs = await this.DescribeFileSystems(params);

      totalCount = rs.TotalCount;
      pageNumber = rs.PageNumber;

      const fileSystems = rs.FileSystems.FileSystem?.filter((fileSystem) => {
        // 当前文件系统不可用/当前文件系统停机中/当前文件系统删除中 这是三个不可用的状态抛除
        if (['Stopped', 'Stopping', 'Deleting'].includes(fileSystem.Status)) return false;
        if (fileSystem.Description !== description) return false;
        if (!needFilterZoneId) return true;
        return fileSystem.ZoneId === zoneId;
      });

      logger.debug(`DescribeFileSystems response is: ${JSON.stringify(fileSystems)}.`);

      expectedFileSystems.push(...fileSystems);
    } while (pageNumber * pageSize < totalCount);

    logger.debug(`find filesystem: ${JSON.stringify(expectedFileSystems)}.`);
    return expectedFileSystems;
  }

  private async createNasFileSystem(regionId: string, zoneId: string, description: string, storageType: string) {
    const zones = await this.nasClient.request(
      'DescribeZones',
      { RegionId: regionId },
      REQUESTOPTION,
    );
    logger.debug(`Call DescribeZones RegionId is: ${regionId}, response is: ${JSON.stringify(zones)}`);
    storageType = await this.getStorageType(zones.Zones.Zone, zoneId, regionId, storageType);

    const params = {
      RegionId: regionId,
      StorageType: storageType,
      Description: description,
      ZoneId: zoneId,
      ProtocolType: 'NFS',
    };

    logger.debug(`Call CreateFileSystem params is: ${JSON.stringify(params)}.`);
    const rs = await this.nasClient.request('CreateFileSystem', params, REQUESTOPTION);
    await writeCreatCache({
      accountID: this.accountID,
      region: this.regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      fileSystemId: rs.FileSystemId,
    });
    return rs.FileSystemId;
  }

  private async createMountTarget(
    fileSystemId: string,
    vpcId: string,
    vSwitchId: string,
  ): Promise<string> {
    const params = {
      RegionId: this.regionId,
      NetworkType: 'Vpc',
      FileSystemId: fileSystemId,
      AccessGroupName: 'DEFAULT_VPC_GROUP_NAME',
      VpcId: vpcId,
      VSwitchId: vSwitchId,
    };

    const rs = await this.nasClient.request('CreateMountTarget', params, REQUESTOPTION);
    logger.debug(`CreateMountTarget target response: ${JSON.stringify(rs)}`);

    const mountTargetDomain = rs.MountTargetDomain;

    await this.waitMountPointUntilAvaliable(fileSystemId, mountTargetDomain);
    await writeCreatCache({
      accountID: this.accountID,
      region: this.regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      mountTargetDomain,
    });

    return mountTargetDomain;
  }

  private async getStorageType(
    zones: any[],
    zoneId: string,
    region: string,
    storageType?: string,
  ): Promise<string> {
    for (const item of zones) {
      if (item.ZoneId === zoneId) {
        if (storageType) {
          if (_.isEmpty(item[storageType].Protocol)) {
            throw new Error(`There is no ${storageType} storage type in this area.`);
          }
          return storageType;
        }

        if (!_.isEmpty(item.Performance.Protocol)) {
          return 'Performance';
        }

        if (this.assumeYes) {
          logger.warn(`Reminder: Region ${region} only supports capacity NAS.`);
          return 'Capacity';
        }

        const msg = `Region ${region} only supports capacity NAS. Do you want to create it automatically?`;
        if (await promptForConfirmContinue(msg)) {
          return 'Capacity';
        }
        throw new Error(`No NAS service available under region ${region}.`);
      }
    }

    throw new Error(`There is no zoneId ${zoneId} available for the region ${region}.`);
  }

  // 按顺序查找文件系统中使用 vpcConfig 的有效挂载点
  // 如果查到则返回 fileSystemId 和 mountTargetDomain
  // 如果没有找到则返回第一个元素的 fileSystemId
  private findFileSystemWithVpcConfig(fileSystems: any[], vpcConfig: IVpcConfig): FileSystemKey {
    if (_.isEmpty(vpcConfig)) {
      return { fileSystemId: fileSystems[0].FileSystemId };
    }

    const { vpcId, vSwitchIds } = vpcConfig;
    for (const fileSystem of fileSystems) {
      const mountTarget = fileSystem?.MountTargets?.MountTarget;
      if (!_.isEmpty(mountTarget)) {
        for (const mountTargetItem of mountTarget) {
          // Inactive：不可用 Deleting：删除中  跳出这两个状态
          if (['Inactive', 'Deleting'].includes(mountTargetItem.Status)) continue;
          if (vpcId === mountTargetItem.VpcId && vSwitchIds.includes(mountTargetItem.VswId)) {
            return {
              fileSystemId: fileSystem.FileSystemId,
              mountTargetDomain: mountTargetItem.MountTargetDomain,
            };
          }
        }
      }
    }

    return { fileSystemId: fileSystems[0].FileSystemId };
  }

  private async waitMountPointUntilAvaliable(
    fileSystemId: string,
    mountTargetDomain: string,
  ): Promise<void> {
    let count = 0;
    let status: string;

    do {
      count++;

      await sleep(2000);

      const rs = await this.nasClient.request(
        'DescribeMountTargets',
        {
          RegionId: this.regionId,
          FileSystemId: fileSystemId,
          MountTargetDomain: mountTargetDomain,
        },
        REQUESTOPTION,
      );
      status = rs.MountTargets?.MountTarget[0]?.Status;
      logger.debug(`nas status is: ${ status}`);
      logger.debug(`Nas mount target domain already created, waiting for status to be 'Active', now is ${status}`);
    } while (count < 15 && status !== 'Active');

    if (status !== 'Active') {
      throw new Error(
        `Timeout while waiting for MountPoint ${mountTargetDomain} status to be 'Active',please try again.`,
      );
    }
  }

  private async DescribeFileSystems(params: { [key: string]: any }) {
    return await this.nasClient.request('DescribeFileSystems', params, REQUESTOPTION);
  }

  private async deleteMountTarget(fileSystemId: string, mountTargetDomain: string) {
    const p = {
      FileSystemId: fileSystemId,
      MountTargetDomain: mountTargetDomain,
    };
    logger.info(`Removing MountTarget: ${mountTargetDomain}`);
    await this.nasClient.request('DeleteMountTarget', p, REQUESTOPTION);
    logger.debug(`Delete ${mountTargetDomain} success.`);
  }

  private async deleteLifecyclePolicy(fileSystemId: string) {
    const rs = await this.nasClient.request('DescribeLifecyclePolicies', { FileSystemId: fileSystemId, PageSize: 100 }, {
      method: 'GET',
    });
    if (rs.TotalCount > 0) {
      for (const { LifecyclePolicyName } of rs.LifecyclePolicies) {
        await this.nasClient.request('DeleteLifecyclePolicy', { FileSystemId: fileSystemId, LifecyclePolicyName }, REQUESTOPTION);
      }
    }
  }

  private async deleteFileSystem(fileSystemId: string) {
    try {
      await this.deleteLifecyclePolicy(fileSystemId);
    } catch (ex) {
      logger.debug(`deleteLifecyclePolicy ${fileSystemId}: ${ex.code}, ${ex.message}`);
    }
    logger.info(`Removing FileSystem: ${fileSystemId}`);
    await this.nasClient.request('DeleteFileSystem', { FileSystemId: fileSystemId }, REQUESTOPTION);
    logger.debug(`DeleteFileSystem ${fileSystemId} success.`);
  }
}
