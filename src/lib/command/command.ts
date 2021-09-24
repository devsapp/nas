import CommandBase from './command-base';
import logger from '../../common/logger';

export default class Command extends CommandBase {
  async command(serviceName: string, args: string) {
    const cmd = args.replace(/nas:\/\//g, '').replace('--debug', '').trim();
    const lsResponse = await super.callCommands(serviceName, cmd);
    logger.debug(`command cmd res: ${JSON.stringify(lsResponse)}`);

    if (lsResponse?.data?.stdout) {
      logger.log(lsResponse.data.stdout || '');
    }
    if (lsResponse?.data?.stderr) {
      logger.log(lsResponse.data.stderr || '', 'red');
    }
  }
}
