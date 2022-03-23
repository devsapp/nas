import * as core from '@serverless-devs/core';
import path from 'path';
import logger from '../../common/logger';

async function getStateId(accountID, region, serviceName) {
  const fcCore = await core.loadComponent('devsapp/fc-core');
  return await fcCore.DeployCache.getCreateResourceStateID(accountID, region, serviceName);
}

interface WriteCreatCache {
  accountID: string;
  region: string;
  serviceName: string;
  configPath: string;
  mountTargetDomain?: string;
  fileSystemId?: string;
}

// 记录组件创建的资源
export async function writeCreatCache({
  accountID, region, serviceName, configPath,
  mountTargetDomain, fileSystemId,
}: WriteCreatCache) {
  if (!(region && serviceName)) { // region serviceName必须存在，否则不计入缓存
    return;
  }
  try {
    const stateId = await getStateId(accountID, region, serviceName);
    const cachePath = path.join(configPath ? path.dirname(configPath) : process.cwd(), '.s');
    const cacheData = (await core.getState(stateId, cachePath)) || {};

    if (mountTargetDomain) {
      cacheData.mountTargetDomain = mountTargetDomain;
    }
    if (fileSystemId) {
      cacheData.fileSystemId = fileSystemId;
    }

    await core.setState(stateId, cacheData, cachePath);
  } catch (ex) {
    /* 不影响主进程 */
    logger.debug(ex);
  }
}
