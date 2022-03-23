import _ from 'lodash';
import async from 'async';
import path from 'path';
import * as core from '@serverless-devs/core';

export function chunk(arr: string[], size: number): any[] {
  if (size < 1) {
    throw new Error('chunk step should not be 0');
  }
  return Array(Math.ceil(arr.length / size))
    .fill(undefined)
    .map((__, i) => arr.slice(i * size, i * size + size));
}

export default async function readDirRecursive(rootPath: string) {
  const { fse } = core;
  const files = await core.ignoreWalk({
    ignoreFiles: ['.nasignore'],
    path: rootPath,
    includeEmpty: true,
  });
  const relativePaths = [];

  await new Promise((resolve) => {
    const queue = async.queue(async (fullPath, next) => {
      if (process.platform === 'win32') {
        fullPath = fullPath.split(path.sep).join('/');
      }

      const stat = await fse.stat(path.join(rootPath, fullPath));
      if (stat.isDirectory()) {
        fullPath = `${fullPath}/`;
      }
      relativePaths.push(fullPath);

      next();
    }, 30);

    queue.drain(() => resolve(''));
    queue.push(files);
  });

  return relativePaths;
}
