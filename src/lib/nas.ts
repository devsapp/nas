
import _ from 'lodash';
import { nasClient } from './utils/client';
import { ICredentials, IDeployProps, IRemoveProps, isVpcConfig, IVpcConfig } from '../interface';
import logger from '../common/logger';
import { promptForConfirmContinue, sleep } from './utils/utils';
import { writeCreatCache } from './utils/write-creat-cache';

const REQUESTOPTION = {
  method: 'POST',
};

const createMountCheckRetry = _.parseInt(process.env.CHECK_NAS_STATUS_RETRY || '30');

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

  fileSystemType: 'standard' | 'extreme';
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
    this.fileSystemType = 'standard';
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
    if (['standard', 'advance'].includes(storageType)) {
      // 存储类型。
      // 当 FileSystemType=standard 时，取值：Performance（性能型） 、 Capacity（容量型）。
      // 当 FileSystemType=extreme 时，取值：standard（标准型） 、 advance（高级型）。
      this.fileSystemType = 'extreme';
    }
    let { fileSystemId, mountTargetDomain } = (await this.findNasFileSystem(nasName, undefined, vpcConfig)) || {};

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
          await this.waitFileSystemUntilAvaliable(fileSystemId);
          // 后面 nas 那边修复这个问题可以删掉这个逻辑
          try {
            // 极速盘存在创建后 Description 丢失的问题，在这尝试修改一下
            await this.nasClient.request(
              'ModifyFileSystem',
              { RegionId: regionId, FileSystemId: fileSystemId, Description: nasName },
              REQUESTOPTION,
            );
          } catch (err) {
            logger.debug(err);
            logger.log(`\n修改文件描述失败，请前往 https://nasnext.console.aliyun.com/${regionId}/filesystem 查看 ${fileSystemId} 的名称是否是 ${nasName}。如果不是请求手动修改，以防下次复用资源失败。`, 'yellow');
            logger.log(`\nFailed to modify file description. Please go to https://nasnext.console.aliyun.com/${regionId}/filesystem check if the name of ${fileSystemId} is ${nasName}。If it is not a request for manual modification, in case the next reuse of resources fails。`, 'yellow');
          }
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

    return {} as FileSystemKey;
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
      { RegionId: regionId, FileSystemType: this.fileSystemType },
      REQUESTOPTION,
    );
    logger.debug(`Call DescribeZones RegionId is: ${regionId}, response is: ${JSON.stringify(zones)}`);
    storageType = await this.getStorageType(zones.Zones.Zone, zoneId, regionId, storageType);

    const params = {
      RegionId: regionId,
      StorageType: storageType,
      Description: description,
      FileSystemType: this.fileSystemType,
      Capacity: 100,
      ZoneId: zoneId,
      ProtocolType: 'NFS',
    };

    logger.debug(`Call CreateFileSystem params is: ${JSON.stringify(params)}.`);
    const rs = await this.nasClient.request('CreateFileSystem', params, REQUESTOPTION);
    logger.debug(`Call CreateFileSystem response is: ${JSON.stringify(rs)}.`);
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
    let hasZones = false;
    for (const item of zones) {
      if (item.ZoneId === zoneId) {
        hasZones = true;
        if (storageType) {
          // 极速和通用格式不一样，单独处理
          if (this.fileSystemType === 'extreme') {
            const instanceTypes = _.get(item, 'InstanceTypes.InstanceType', []);
            const i = _.find(instanceTypes, { StorageType: storageType });
            if (_.isEmpty(i)) {
              continue;
            }
            return storageType;
          }

          if (_.isEmpty(item[storageType]?.Protocol)) {
            continue;
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

    if (hasZones) {
      throw new Error(`There is no ${storageType} storage type in this area.`);
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
      logger.debug(`nas status is: ${status}`);
      logger.debug(`Nas mount target domain already created, waiting for status to be 'Active', now is ${status}`);
    } while (count < createMountCheckRetry && status !== 'Active');

    if (status !== 'Active') {
      throw new Error(
        `Timeout while waiting for MountPoint ${mountTargetDomain} status to be 'Active',please try again.`,
      );
    }
  }

  private async waitFileSystemUntilAvaliable(fileSystemId: string) {
    let count = 0;
    let status: string;

    do {
      count++;

      await sleep(2000);

      const rs = await this.nasClient.request(
        'DescribeFileSystems',
        {
          RegionId: this.regionId,
          FileSystemType: this.fileSystemType,
          FileSystemId: fileSystemId,
          PageSize: 100,
        },
        REQUESTOPTION,
      );

      // 文件系统状态。包括：
      //   Pending：当前文件系统正在处理任务中。
      //   Extending：当前文件系统扩容中。
      //   Running：当前文件系统可用，当状态为Running时才可以进行后续操作（例如：创建挂载点等）。
      //   Stopped：当前文件系统不可用。
      //   Stopping：当前文件系统停机中。
      //   Deleting：当前文件系统删除中。
      status = _.get(rs, 'FileSystems.FileSystem.0.Status');
      logger.debug(`${count}: nas fileSystemId ${fileSystemId} status is: ${status}`);
      if (_.isEmpty(status)) {
        logger.debug('status is empty.Program attempting to continue processing');
        return;
      } else if (['Running'].includes(status)) {
        return;
      } else if (['Stopped', 'Stopping', 'Deleting'].includes(status)) {
        throw new Error(`Detect that the status of ${fileSystemId} is ${status} and is no longer available. Please try again`);
      }
    } while (count < (createMountCheckRetry * 3));

    if (status !== 'Running') {
      throw new Error(
        `Timeout while waiting for FileSystemId ${fileSystemId} status to be 'Running',please try again.`,
      );
    }
  }

  private async DescribeFileSystems(params: { [key: string]: any }) {
    try {
      return await this.nasClient.request('DescribeFileSystems', params, REQUESTOPTION);
    } catch (ex) {
      if (ex.code === 'User.Disabled') {
        logger.debug(' Error: Your account does not open Nas Service yet or balance is insufficient');
        const rs = await this.nasClient.request('OpenNASService');
        logger.debug(`open nas success: ${JSON.stringify(rs)}`);
        return await this.nasClient.request('DescribeFileSystems', params, REQUESTOPTION);
      }
      throw ex;
    }
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
