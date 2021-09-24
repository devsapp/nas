import FC from '@alicloud/fc2';
import Pop from '@alicloud/pop-core';
import { ICredentials } from '../../interface';

const timeout = 600 * 1000;

export default fcClient;

export function fcClient(regionId: string, profile: ICredentials) {
  const client = new FC(profile.AccountID, {
    accessKeyID: profile.AccessKeyID,
    accessKeySecret: profile.AccessKeySecret,
    securityToken: profile.SecurityToken,
    region: regionId,
    timeout,
  });

  client.get = async (path, query, headers) => {
    const res = await client.request('GET', path, query, null, headers);
    const data = (res && res.data) || {};
    if (data.error) {
      throw new Error(data.error);
    }

    return res;
  };

  client.post = async (path, body, headers, queries, opts = {}) => {
    const res = await client.request('POST', path, queries, body, headers, opts);
    const data = (res && res.data) || {};
    if (data.error) {
      throw new Error(data.error);
    }

    return res;
  };

  return client;
}

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
