export declare const getTimeout: () => number;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function promptForConfirmContinue(message: string): Promise<boolean>;
export declare const nasUriHandler: (nasDirYmlInput: string) => string;
export declare function getMountDir(mountPointDomain: string, nasDir: string): string;
