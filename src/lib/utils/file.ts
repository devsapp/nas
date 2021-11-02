
import fs from 'fs-extra';
import logger from '../../common/logger';

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
  // 默认是 5M
  const chunkSize = parseInt(process.env.NAS_CHUNK_SIZE || '4', 10) * 1024 * 1024;

  const res = [];
  while (start < end) {
    const size = Math.min(chunkSize, end - start);
    res.push({ start, size });
    start += size;
  }
  return res;
}
