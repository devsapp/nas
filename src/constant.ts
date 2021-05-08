export const CONTEXT = 'FC-NAS';
export const CONTEXT_NAME = 'fc-nas';

export const FUNNAME = 'nas-function';

export const RETRYOPTIONS = {
  retries: 5,
  factor: 2,
  minTimeout: 1 * 1000,
  randomize: true,
};

export const REQUESTOPTION = {
  method: 'POST',
};

export const HELP = [
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
]

export const LSHELP = [
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

export const CPHELP = [
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

export const RMHELP = [
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

export const UPLOADHELP = [
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
        desc: '使用: upload [options] <src_path> <fc_dir>',
        example: '$ s exec -- upload /home/usr/demo.file nas://<fc_dir>',
      },
    ],
  },
];

export const DOWNLOADHELP = [
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
        desc: '使用: download [options] <fc_dir> <src_path>',
        example: '$ s exec -- download nas://<fc_dir> /home/usr/demo',
      },
    ],
  },
];

export const COMMANDHELP = [
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
        desc: '使用: command <cmd>',
        example: '$ s exec -- command ls nas:///<nas_dir>',
      },
    ],
  },
];
