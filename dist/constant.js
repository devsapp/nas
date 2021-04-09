"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RMHELP = exports.CPHELP = exports.LSHELP = exports.HELP = exports.REQUESTOPTION = exports.RETRYOPTIONS = exports.FUNNAME = exports.CONTEXT = void 0;
exports.CONTEXT = 'FC-NAS';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRW5CLFFBQUEsT0FBTyxHQUFHLGNBQWMsQ0FBQztBQUV6QixRQUFBLFlBQVksR0FBRztJQUMxQixPQUFPLEVBQUUsQ0FBQztJQUNWLE1BQU0sRUFBRSxDQUFDO0lBQ1QsVUFBVSxFQUFFLENBQUMsR0FBRyxJQUFJO0lBQ3BCLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRztJQUMzQixNQUFNLEVBQUUsTUFBTTtDQUNmLENBQUM7QUFFVyxRQUFBLElBQUksR0FBRztJQUNsQjtRQUNFLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsT0FBTyxFQUFFLG9CQUFvQjthQUM5QjtZQUNEO2dCQUNFLE9BQU8sRUFBRSxvQkFBb0I7YUFDOUI7U0FDRjtLQUNGO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFHO0lBQ3BCO1FBQ0UsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsV0FBVyxFQUFFLG1CQUFtQjtnQkFDaEMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxLQUFLLEVBQUUsR0FBRztnQkFDVixhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLCtCQUErQjtnQkFDckMsT0FBTyxFQUFFLDJCQUEyQjthQUNyQztTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxNQUFNLEdBQUc7SUFDcEI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixLQUFLLEVBQUUsR0FBRztnQkFDVixhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsSUFBSSxFQUFFLDBDQUEwQztnQkFDaEQsT0FBTyxFQUFFLDZDQUE2QzthQUN2RDtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxNQUFNLEdBQUc7SUFDcEI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLEtBQUssRUFBRSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLE1BQU07Z0JBQ25CLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxPQUFPLEVBQUUsK0JBQStCO2FBQ3pDO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==