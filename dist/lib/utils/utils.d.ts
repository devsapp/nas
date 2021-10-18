/// <reference types="node" />
import fs from 'fs-extra';
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function getCredential(credentials: any, inputs: any): Promise<any>;
export declare const isNcc: (basePath: string) => boolean;
export declare const makeSureNasUriStartWithSlash: (nasDir?: string) => string;
export declare function getCodeVersion(fileName?: string): string;
export declare function convertWin32PathToLinux(uri: string): string;
export declare function promptForConfirmContinue(message: string): Promise<boolean>;
export declare function resolveLocalPath(localPath: string): string;
export declare function getFileStat(dirPath: string): Promise<false | fs.Stats>;
export declare function argReplace(fcDir: any): any;
