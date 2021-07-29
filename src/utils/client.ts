import FC from '@alicloud/fc2';
import * as core from '@serverless-devs/core';
import { ICredentials } from '../interface';
import { getTimeout } from './utils';

export function fcClient(regionId: string, profile: ICredentials) {
  const client = new FC(profile.AccountID, {
    accessKeyID: profile.AccessKeyID,
    accessKeySecret: profile.AccessKeySecret,
    securityToken: profile.SecurityToken,
    region: regionId,
    endpoint: FcEndpoint.endpoint,
    timeout: getTimeout(),
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

export class FcEndpoint {
  static endpoint: string;

  static async getFcEndpoint() {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    const endpoint = (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
    this.endpoint = endpoint;
    return endpoint;
  }
}
