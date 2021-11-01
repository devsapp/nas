import * as core from '@serverless-devs/core';
import os from 'os';
import inquirer from 'inquirer';
import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCredential(credentials, inputs) {
  if (!_.isEmpty(credentials)) {
    return credentials;
  }
  return await core.getCredential(inputs, inputs?.project?.access);
}

// 只能判断非根目录的路径
export const isNcc = (basePath: string): boolean => path.basename(basePath) === 'dist';

export const makeSureNasUriStartWithSlash = (nasDir = ''): string =>
  (nasDir.startsWith('/') ? nasDir : `/${nasDir}`);

export function getCodeVersion(fileName = 'VERSION'): string {
  let versionFile = path.join(__dirname, '..', '..', 'helper-service-code', fileName);
  if (isNcc(__dirname)) {
    versionFile = path.join(__dirname, 'helper-service-code', fileName);
  }
  return (fs.readFileSync(versionFile)).toString();
}

export function convertWin32PathToLinux(uri: string): string {
  if (process.platform === 'win32') {
    return uri.replace(/\\/g, '/');
  }
  return uri;
}

export async function promptForConfirmContinue(message: string): Promise<boolean> {
  if (!process.stdin.isTTY) {
    return true;
  }

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]);

  if (answers.ok) {
    return true;
  }
  return false;
}

export function resolveLocalPath(localPath: string): string {
  if (!localPath) {
    throw new Error('Local path could not be empty');
  }

  const rootDir = path.parse(process.cwd()).root;
  if (localPath.startsWith(rootDir)) {
    return localPath;
  } else if (localPath.startsWith('~')) {
    return localPath.replace(/~/, os.homedir());
  }
  const currentDir = process.cwd();
  return path.join(currentDir, localPath);
}

export function argReplace(fcDir) {
  return fcDir.replace(/nas:\/\//g, '');
}

export function getConfigDirname(configPath: string) {
  if (configPath) {
    return path.dirname(configPath);
  }

  return process.cwd();
}
