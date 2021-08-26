import { HLogger, ILogger } from '@serverless-devs/core';
import Pop from '@alicloud/pop-core';
import _ from 'lodash';
import { getTimeout, promptForConfirmContinue, sleep } from './utils';
import StdoutFormatter from '../stdout-formatter';
import { CONTEXT, REQUESTOPTION } from '../constant';
import { IProperties, ICredentials, INasInitResponse } from '../interface';

export default class Nas {
  @HLogger(CONTEXT) logger: ILogger;
  nasClient: any;
  stdoutFormatter = StdoutFormatter.stdoutFormatter;

  constructor(regionId, profile: ICredentials) {
    this.nasClient = new Pop({
      endpoint: `http://nas.${regionId}.aliyuncs.com`,
      apiVersion: '2017-06-26',
      accessKeyId: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      // @ts-ignore
      securityToken: profile.SecurityToken,
      opts: {
        timeout: getTimeout(),
      },
    });
  }

  async init(properties: IProperties): Promise<INasInitResponse> {
    const { regionId, nasName, vpcId, zoneId, vSwitchId, storageType } = properties;
    const vswitchId = _.isString(vSwitchId) ? vSwitchId : vSwitchId[0];
    let fileSystemId = await this.findNasFileSystem(regionId, nasName);

    if (!fileSystemId) {
      this.logger.info(this.stdoutFormatter.create('NasFileSystem', nasName));

      fileSystemId = await this.createNasFileSystem(regionId, zoneId, nasName, storageType);

      this.logger.debug(
        `Default nas file system has been generated, fileSystemId is: ${fileSystemId}`,
      );
    } else {
      this.logger.debug(`Nas file system already generated, fileSystemId is: ${fileSystemId}`);
    }

    let mountTargetDomain = await this.findMountTarget(regionId, fileSystemId, vpcId, vswitchId);

    if (mountTargetDomain) {
      this.logger.debug(
        `Nas file system mount target is already created, mountTargetDomain is: ${mountTargetDomain}.`,
      );
    } else {
      this.logger.info(this.stdoutFormatter.create('MountTarget', fileSystemId));

      mountTargetDomain = await this.createMountTarget(regionId, fileSystemId, vpcId, vswitchId);

      this.logger.debug(
        `Default nas file system mount target has been generated, mount domain is: ${mountTargetDomain}`,
      );
    }
    return {
      fileSystemId,
      mountTargetDomain,
    };
  }

  async remove(properties: IProperties) {
    const { regionId, nasName, vpcId, vSwitchId } = properties;
    const vswitchId = _.isString(vSwitchId) ? vSwitchId : vSwitchId[0];
    let { fileSystemId } = properties;
    if (!nasName || !fileSystemId) {
      this.logger.debug('Not found nasName or fileSystemId,skip remove nas.');
      return false;
    }

    if (nasName) {
      fileSystemId = await this.findNasFileSystem(regionId, nasName);
      if (!fileSystemId) {
        this.logger.warn(this.stdoutFormatter.warn('NasFileSystem', `${nasName} not found under ${regionId}.`));
        return false;
      }
    }

    const mountTargetDomain = await this.findMountTarget(regionId, fileSystemId, vpcId, vswitchId);
    this.logger.debug(`Found mount target domain is: ${mountTargetDomain}`);
    if (mountTargetDomain) {
      const p = {
        FileSystemId: fileSystemId,
        MountTargetDomain: mountTargetDomain,
      };
      this.logger.info(this.stdoutFormatter.remove('MountTarget', mountTargetDomain));
      await this.nasClient.request('DeleteMountTarget', p, REQUESTOPTION);
      this.logger.debug(`Delete ${mountTargetDomain} success.`);
    }

    this.logger.info(this.stdoutFormatter.remove('FileSystem', fileSystemId));
    await this.nasClient.request('DeleteFileSystem', { FileSystemId: fileSystemId }, REQUESTOPTION);
    this.logger.debug(`DeleteFileSystem ${fileSystemId} success.`);
    return fileSystemId;
  }

  async findNasFileSystem(regionId: string, description: string): Promise<undefined | string> {
    const pageSize = 100;
    let requestPageNumber = 0;
    let totalCount: number;
    let pageNumber: number;

    let fileSystem;

    do {
      const params = {
        RegionId: regionId,
        PageSize: pageSize,
        PageNumber: ++requestPageNumber,
      };


      this.logger.debug(`DescribeFileSystems request pageNumber: ${requestPageNumber}`);
      const rs = await this.nasClient.request('DescribeFileSystems', params, REQUESTOPTION);

      totalCount = rs.TotalCount;
      pageNumber = rs.PageNumber;

      const fileSystems = rs.FileSystems.FileSystem;
      this.logger.debug(`DescribeFileSystems response is: ${JSON.stringify(fileSystems)}.`);

      fileSystem = _.find(fileSystems, { Description: description });

      this.logger.debug(`find filesystem: ${JSON.stringify(fileSystem)}.`);
    } while (!fileSystem && totalCount && pageNumber && pageNumber * pageSize < totalCount);

    return (fileSystem || {}).FileSystemId;
  }

  async findMountTarget(
    region: string,
    fileSystemId: string,
    vpcId: string,
    vSwitchId: string,
  ): Promise<string | null> {
    const rs = await this.nasClient.request(
      'DescribeMountTargets',
      {
        RegionId: region,
        FileSystemId: fileSystemId,
      },
      REQUESTOPTION,
    );

    this.logger.debug(`Call DescribeMountTargets response is: ${JSON.stringify(rs)}`);

    const mountTargets = rs.MountTargets.MountTarget;
    if (!_.isEmpty(mountTargets)) {
      const mountTarget = _.find(mountTargets, {
        VpcId: vpcId,
        VswId: vSwitchId,
      });
      if (mountTarget) {
        return mountTarget.MountTargetDomain;
      }
    }

    return null;
  }

  async createNasFileSystem(
    regionId: string,
    zoneId: string,
    description: string,
    storageType?: string,
  ) {
    const zones = await this.nasClient.request(
      'DescribeZones',
      {
        RegionId: regionId,
      },
      REQUESTOPTION,
    );
    this.logger.debug(
      `Call DescribeZones RegionId is: ${regionId}, response is: ${JSON.stringify(zones)}`,
    );

    storageType = await this.getStorageType(zones.Zones.Zone, zoneId, regionId, storageType);

    const params = {
      RegionId: regionId,
      StorageType: storageType,
      Description: description,
      ZoneId: zoneId,
      ProtocolType: 'NFS',
    };

    this.logger.debug(`Call CreateFileSystem params is: ${JSON.stringify(params)}.`);
    const rs = await this.nasClient.request('CreateFileSystem', params, REQUESTOPTION);

    return rs.FileSystemId;
  }

  async createMountTarget(
    region: string,
    fileSystemId: string,
    vpcId: string,
    vSwitchId: string,
  ): Promise<string> {
    const params = {
      RegionId: region,
      NetworkType: 'Vpc',
      FileSystemId: fileSystemId,
      AccessGroupName: 'DEFAULT_VPC_GROUP_NAME',
      VpcId: vpcId,
      VSwitchId: vSwitchId,
    };

    const rs = await this.nasClient.request('CreateMountTarget', params, REQUESTOPTION);
    this.logger.debug(`CreateMountTarget target response: ${JSON.stringify(rs)}`);

    const mountTargetDomain = rs.MountTargetDomain;

    await this.waitMountPointUntilAvaliable(region, fileSystemId, mountTargetDomain);

    return mountTargetDomain;
  }

  async getStorageType(
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
          } else {
            return storageType;
          }
        }

        if (!_.isEmpty(item.Performance.Protocol)) {
          return 'Performance';
        } else {
          const msg = `Region ${region} only supports capacity NAS. Do you want to create it automatically?`;
          const yes = await promptForConfirmContinue(msg);
          if (yes) {
            return 'Capacity';
          }
          throw new Error(`No NAS service available under region ${region}.`);
        }
      }
    }

    throw new Error(`There is no zoneId ${zoneId} available for the region ${region}.`);
  }

  async waitMountPointUntilAvaliable(
    region: string,
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
          RegionId: region,
          FileSystemId: fileSystemId,
          MountTargetDomain: mountTargetDomain,
        },
        REQUESTOPTION,
      );
      this.logger.debug(`Call DescribeMountTargets response is: ${JSON.stringify(rs)}`);

      status = rs.MountTargets.MountTarget[0].Status;
      this.logger.debug(`nas status is: ${ status}`);

      this.logger.info(
        `Nas mount target domain already created, waiting for status to be 'Active', now is ${status}`,
      );
    } while (count < 15 && status !== 'Active');

    if (status !== 'Active') {
      throw new Error(
        `Timeout while waiting for MountPoint ${mountTargetDomain} status to be 'Active',please try again.`,
      );
    }
  }
}
