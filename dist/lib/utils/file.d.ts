/// <reference types="node" />
import fs from 'fs-extra';
export declare function getFileStat(dirPath: string): Promise<false | fs.Stats>;
/**
 * 将代码包切片
 * @param start 计算量的起点
 * @param end 计算量的终点
 * @returns { start:, size }[]
 */
export declare function splitRangeBySize(start: number, end: number): any[];
