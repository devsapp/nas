module.exports = {
  extends: 'eslint-config-ali/typescript',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'no-bitwise': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  },
};
