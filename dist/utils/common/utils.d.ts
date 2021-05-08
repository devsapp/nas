export declare const isNasProtocol: (inputPath: string) => boolean;
export declare function commandCmd(args: string, mountDir: string, nasDirYmlInput: string): string;
export declare function parseNasUri(nasUri: string, mountDir: string, nasDirYmlInput: string): string;
export declare function resolveLocalPath(localPath: string): string;
interface IDirOrFile {
    isDir: boolean;
    isFile: boolean;
}
export declare function isDirOrFile(inputPath: string): Promise<IDirOrFile>;
interface INasId {
    UserId: number;
    GroupId: number;
}
export declare function checkWritePerm(stats: any, nasId: INasId, nasPath: string): string | undefined;
export declare function splitRangeBySize(start: number, end: number, chunkSize: number): any[];
export declare function readDirRecursive(rootPath: string, excludes: string[]): Promise<any[]>;
export declare function chunk(arr: string[], size: number): any[];
export {};
