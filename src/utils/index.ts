import * as core from '@serverless-devs/core';
import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';


export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCredential(credentials, inputs) {
  if (!_.isEmpty(credentials)) {
    return credentials;
  }
  return await core.getCredential(inputs);
}

// 只能判断非根目录的路径
export const isNcc = (basePath: string): boolean => {
  return path.basename(basePath) === 'dist';
};

export const makeSureNasUriStartWithSlash = (nasDirYmlInput: string) =>
  (nasDirYmlInput.startsWith('/') ? nasDirYmlInput.substr(1) : nasDirYmlInput);

export function generateAssistMountDir(mountPointDomain: string, nasDir: string) {
  const [systemId, region] = mountPointDomain.split('.');
  return `/mnt/${systemId}-${region}/${makeSureNasUriStartWithSlash(nasDir)}`;
}

export function getCodeVersion() {
  let versionFile = path.join(__dirname, '..', 'helper-service-code', 'VERSION');
  if (isNcc(__dirname)) {
    versionFile = path.join(__dirname, 'helper-service-code', 'VERSION');
  }
  return (fs.readFileSync(versionFile)).toString();
}

export function convertWin32PathToLinux(uri: string): string {
  if (process.platform === 'win32') {
    return uri.replace(/\\/g, '/');
  }
  return uri;
}
