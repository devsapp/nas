export declare const CONTEXT = "FC-NAS";
export declare const FUNNAME = "nas-function";
export declare const RETRYOPTIONS: {
    retries: number;
    factor: number;
    minTimeout: number;
    randomize: boolean;
};
export declare const REQUESTOPTION: {
    method: string;
};
export declare const HELP: ({
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
})[];
export declare const LSHELP: ({
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        defaultOption?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
    optionList?: undefined;
})[];
export declare const CPHELP: ({
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        defaultOption?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
    optionList?: undefined;
})[];
export declare const RMHELP: ({
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
        defaultOption?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
    optionList?: undefined;
})[];
