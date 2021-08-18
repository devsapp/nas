import inquirer from 'inquirer';
import path from 'path';

export const getTimeout = (): number => parseInt(process.env.NAS_FUNCTION_TIMEOUT) || 600 * 1000;

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 只能判断非根目录的路径
export const isNcc = (basePath: string): boolean => {
  return path.basename(basePath) === 'dist';
};

export async function promptForConfirmContinue(message: string): Promise<boolean> {
  if (!process.stdin.isTTY) {
    return true;
  }

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]);

  if (answers.ok) {
    return true;
  }
  return false;
}

export const nasUriHandler = (nasDirYmlInput: string) =>
  (nasDirYmlInput.startsWith('/') ? nasDirYmlInput.substr(1) : nasDirYmlInput);

export function getMountDir(mountPointDomain: string, nasDir: string) {
  // 24e0349ccc-psq48.cn-shenzhen.nas.aliyuncs.com
  const [systemId, region] = mountPointDomain.split('.');
  return `/mnt/${systemId}-${region}/${nasUriHandler(nasDir)}`;
}

export function transformNasDirPath(url: string) {
  const isWin = process.platform === 'win32';
  if (isWin) {
    return url.replace(/\\/g, '/');
  }
  return url;
}
