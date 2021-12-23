import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import walkdir from 'walkdir';
import * as core from '@serverless-devs/core';

const { ignore } = core;

function isEmptyDir(targetPath) {
  const lstat = fs.lstatSync(targetPath);
  if (lstat.isDirectory()) {
    const dirs = fs.readdirSync(targetPath);
    if (_.isEmpty(dirs)) {
      return true;
    }
  }
  return false;
}

export function chunk(arr: string[], size: number): any[] {
  if (size < 1) {
    throw new Error('chunk step should not be 0');
  }
  return Array(Math.ceil(arr.length / size))
    .fill(undefined)
    .map((__, i) => arr.slice(i * size, i * size + size));
}

export default function readDirRecursive(rootPath: string, excludes: string[]): Promise<any[]> {
  const ig = ignore().add(excludes);
  return new Promise((resolve) => {
    const relativePaths = [];

    if (isEmptyDir(rootPath)) {
      return resolve(relativePaths);
    }

    walkdir(rootPath, {
      track_inodes: true,
    })
      .on('path', (fullPath, stat) => {
        let relativePath = path.relative(rootPath, fullPath);

        if (ig.ignores(relativePath)) {
          return;
        }

        if (process.platform === 'win32') {
          relativePath = relativePath.split(path.sep).join('/');
        }

        if (stat.isDirectory()) {
          if (!_.isEmpty(fs.readdirSync(fullPath))) {
            return;
          }

          relativePath = `${relativePath}/`;
        }

        relativePaths.push(relativePath);
      })
      .on('end', () => resolve(relativePaths));
  });
}
