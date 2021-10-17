import CommandBase from './command-base';
import logger from '../../common/logger';

export default class Command extends CommandBase {
  async command(serviceName: string, args: string) {
    const cmd = args.replace(/nas:\/\//g, '').replace('--debug', '').trim();
    const commandResponse = await super.callCommands(serviceName, cmd);
    logger.debug(`command cmd res: ${JSON.stringify(commandResponse)}`);

    if (commandResponse?.data?.stdout) {
      logger.log(commandResponse.data.stdout || '');
    }
    if (commandResponse?.data?.stderr) {
      logger.log(commandResponse.data.stderr || '', 'red');
    }
  }
}
