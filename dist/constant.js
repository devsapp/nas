"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMANDHELP = exports.DOWNLOADHELP = exports.UPLOADHELP = exports.RMHELP = exports.CPHELP = exports.LSHELP = exports.REOMVE_HELP = exports.DEPLOY_HELP = exports.REQUESTOPTION = exports.RETRYOPTIONS = exports.FUNNAME = exports.CONTEXT_NAME = exports.CONTEXT = void 0;
exports.CONTEXT = 'FC-NAS';
exports.CONTEXT_NAME = 'fc-nas';
exports.FUNNAME = 'nas-function';
exports.RETRYOPTIONS = {
    retries: 5,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
};
exports.REQUESTOPTION = {
    method: 'POST',
};
exports.DEPLOY_HELP = [
    {
        header: 'Description',
        content: 'Deploy nas and auxiliary resources',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- deploy' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Deploy help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
];
exports.REOMVE_HELP = [
    {
        header: 'Description',
        content: 'Remove nas and auxiliary resources',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- remove' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Remove help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
];
exports.LSHELP = [
    {
        header: 'Options',
        optionList: [
            {
                name: 'all',
                description: '列出远端 NAS 目录下的所有内容',
                alias: 'a',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'long',
                description: '列出远端 NAS 目录下内容的详细信息',
                alias: 'l',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'help',
                description: '使用引导',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                desc: '使用: ls [options] <fc_dir>',
                example: '$ s exec -- ls nas:///<nas_dir>',
            },
        ],
    },
];
exports.CPHELP = [
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: '迭代复制文件夹内容',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: '不覆盖已存在文件',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'help',
                description: '使用引导',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                desc: '使用: cp [options] <src_path> <fc_dir>',
                example: '$ s exec -- cp /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
];
exports.RMHELP = [
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: '递归删除文件夹',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'force',
                description: '删除文件而不提示您进行确认',
                alias: 'f',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'help',
                description: '使用引导',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                desc: '使用: rm [options] <nas_dir>',
                example: '$ s exec -- rm -f -r nas://<fc_dir>',
            },
        ],
    },
];
exports.UPLOADHELP = [
    {
        header: 'Upload',
        content: 'Upload resources.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- upload <option>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: 'Iterate to copy folder content',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: 'Do not override existing files',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Upload help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s exec -- upload /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- upload /home/usr/demo.file nas://<fc_dir>',
            },
        ],
    },
];
exports.DOWNLOADHELP = [
    {
        header: 'Download',
        content: 'Download resources.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- download <option>' },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'recursive',
                description: 'Iterate to copy folder content',
                alias: 'r',
                defaultOption: false,
                type: Boolean,
            },
            {
                name: 'no-clobber',
                description: 'Do not override existing files',
                alias: 'n',
                defaultOption: false,
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Download help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples with Yaml',
        content: [
            {
                example: '$ s exec -- download nas://<fc_dir> /home/usr/demo',
            },
        ],
    },
];
exports.COMMANDHELP = [
    {
        header: 'Command',
        content: 'Operation instruction.',
    },
    {
        header: 'Usage',
        content: [
            { example: '$ s exec -- command <option>' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'help',
                description: 'Download help for command',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- command ls nas:///<nas_dir>',
            },
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQ25CLFFBQUEsWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUV4QixRQUFBLE9BQU8sR0FBRyxjQUFjLENBQUM7QUFFekIsUUFBQSxZQUFZLEdBQUc7SUFDMUIsT0FBTyxFQUFFLENBQUM7SUFDVixNQUFNLEVBQUUsQ0FBQztJQUNULFVBQVUsRUFBRSxDQUFDLEdBQUcsSUFBSTtJQUNwQixTQUFTLEVBQUUsSUFBSTtDQUNoQixDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQUc7SUFDM0IsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQUc7SUFDekI7UUFDRSxNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsb0NBQW9DO0tBQzlDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRTtZQUNQLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFO1NBQ2xDO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLHlCQUF5QjtnQkFDdEMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQUc7SUFDekI7UUFDRSxNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsb0NBQW9DO0tBQzlDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRTtZQUNQLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFO1NBQ2xDO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsVUFBVSxFQUFFO1lBQ1Y7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