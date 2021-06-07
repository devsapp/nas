export declare const CONTEXT = "FC-NAS";
export declare const CONTEXT_NAME = "fc-nas";
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
export declare const DEPLOY_HELP: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
})[];
export declare const REOMVE_HELP: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
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
export declare const UPLOADHELP: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
})[];
export declare const DOWNLOADHELP: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
})[];
export declare const COMMANDHELP: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
})[];
