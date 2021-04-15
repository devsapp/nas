"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RMHELP = exports.CPHELP = exports.LSHELP = exports.HELP = exports.REQUESTOPTION = exports.RETRYOPTIONS = exports.FUNNAME = exports.CONTEXT_NAME = exports.CONTEXT = void 0;
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
exports.HELP = [
    {
        header: 'Options',
        optionList: [
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
                example: '$ s exec -- deploy',
            },
            {
                example: '$ s exec -- remove',
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
                desc: '使用: nas ls [options] <fc_dir>',
                example: '$ nas ls nas:///<nas_dir>',
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
                desc: '使用: nas cp [options] <src_path> <fc_dir>',
                example: '$ nas cp /home/usr/demo.file nas://<fc_dir>',
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
                desc: '使用: nas rm [options] <nas_dir>',
                example: '$ nas rm -f -r nas://<fc_dir>',
            },
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQ25CLFFBQUEsWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUV4QixRQUFBLE9BQU8sR0FBRyxjQUFjLENBQUM7QUFFekIsUUFBQSxZQUFZLEdBQUc7SUFDMUIsT0FBTyxFQUFFLENBQUM7SUFDVixNQUFNLEVBQUUsQ0FBQztJQUNULFVBQVUsRUFBRSxDQUFDLEdBQUcsSUFBSTtJQUNwQixTQUFTLEVBQUUsSUFBSTtDQUNoQixDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQUc7SUFDM0IsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBRVcsUUFBQSxJQUFJLEdBQUc7SUFDbEI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLE9BQU8sRUFBRSxvQkFBb0I7YUFDOUI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsb0JBQW9CO2FBQzlCO1NBQ0Y7S0FDRjtDQUNGLENBQUE7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNwQjtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLHFCQUFxQjtnQkFDbEMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLE9BQU8sRUFBRSwyQkFBMkI7YUFDckM7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsTUFBTSxHQUFHO0lBQ3BCO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixLQUFLLEVBQUUsR0FBRztnQkFDVixhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixXQUFXLEVBQUUsVUFBVTtnQkFDdkIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLElBQUksRUFBRSwwQ0FBMEM7Z0JBQ2hELE9BQU8sRUFBRSw2Q0FBNkM7YUFDdkQ7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsTUFBTSxHQUFHO0lBQ3BCO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixLQUFLLEVBQUUsR0FBRztnQkFDVixhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixLQUFLLEVBQUUsR0FBRztnQkFDVixhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLGdDQUFnQztnQkFDdEMsT0FBTyxFQUFFLCtCQUErQjthQUN6QztTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=