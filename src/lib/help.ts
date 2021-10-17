export const DEPLOY_HELP = [
  {
    header: 'Description',
    content: 'Deploy nas and auxiliary resources',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s deploy' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'assume-yes',
        description: 'Assume that the answer to any question which would be asked is yes',
        alias: 'y',
        type: Boolean,
      },
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
