import Pop from '@alicloud/pop-core';
import { ICredentials } from '../../interface';

const timeout = 600 * 1000;

export function nasClient(regionId: string, profile: ICredentials) {
  return new Pop({
    endpoint: `http://nas.${regionId}.aliyuncs.com`,
    apiVersion: '2017-06-26',
    accessKeyId: profile.AccessKeyID,
    accessKeySecret: profile.AccessKeySecret,
    // @ts-ignore
    securityToken: profile.SecurityToken,
    opts: { timeout },
  });
}
