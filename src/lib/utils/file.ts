
import * as core from '@serverless-devs/core';
import async from 'async';
import path from 'path';
import logger from '../../common/logger';

const { fse: fs, lodash: _, rimraf } = core;

const TNPM_IGNORE_NAME = '.nas_tmp_ignore'
export const IGNORE_FILE_NAME = ['.nasignore', TNPM_IGNORE_NAME];

export async function copyIgnoreFile(filePath, rootPath: string) {
  if (_.isNil(filePath)) {
    return;
  }

  const sourcePath = path.relative(process.cwd(), filePath);
  if (!(await getFileStat(sourcePath))) {
    logger.warn(`Not fount ${filePath}`);
    return;
  }
  const targetFile = path.join(rootPath, TNPM_IGNORE_NAME);
  try {
    await fs.copy(sourcePath, targetFile);
  } catch (ex) {
    logger.debug(ex);
    logger.error('Handler ignore file error');
  }
}

export function removeIgnoreFile(rootPath: string) {
  try {
    rimraf.sync(path.join(rootPath, TNPM_IGNORE_NAME));
  } catch (_ex) { /**/ }
}

export async function getFileStat(dirPath: string) {
  try {
    return await fs.stat(dirPath);
  } catch (ex) {
    logger.debug(`getFileStat ${dirPath}: ${ex.code}, ${ex.message}`);
    return false;
  }
}

/**
 * 将代码包切片
 * @param start 计算量的起点
 * @param end 计算量的终点
 * @returns { start:, size }[]
 */
export function splitRangeBySize(start: number, end: number) {
  // 默认是 4M
  const chunkSize = parseInt(process.env.NAS_CHUNK_SIZE || '4', 10) * 1024 * 1024;

  const res = [];
  while (start < end) {
    const size = Math.min(chunkSize, end - start);
    res.push({ start, size });
    start += size;
  }
  return res;
}

export function chunk(arr: string[], size: number): any[] {
  if (size < 1) {
    throw new Error('chunk step should not be 0');
  }
  return Array(Math.ceil(arr.length / size))
    .fill(undefined)
    .map((__, i) => arr.slice(i * size, i * size + size));
}

export async function readDirRecursive(rootPath: string) {
  const files = await core.ignoreWalk({
    ignoreFiles: IGNORE_FILE_NAME,
    path: rootPath,
    includeEmpty: true,
  });

  const relativePaths = [];

  await new Promise((resolve) => {
    const queue = async.queue(async (fullPath, next) => {
      if (process.platform === 'win32') {
        fullPath = fullPath.split(path.sep).join('/');
      }

      if (fullPath.startsWith('./')) { // 根目录文件以 @ 开头会保留 ./@
        fullPath = fullPath.substr(2);
      }

      const stat = await fs.stat(path.join(rootPath, fullPath));
      if (stat.isDirectory()) {
        fullPath = `${fullPath}/`;
      }

      if (fullPath !== TNPM_IGNORE_NAME) {
        relativePaths.push(fullPath);
      }

      next();
    }, 30);

    queue.drain(() => resolve(''));
    queue.push(files);
  });

  return relativePaths;
}
