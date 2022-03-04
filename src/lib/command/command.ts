import { spinner } from '@serverless-devs/core';
import CommandBase from './command-base';
import logger from '../../common/logger';

export default class Command extends CommandBase {
  async command(serviceName: string, args: string) {
    const cmd = args.replace(/nas:\/\//g, '').replace('--debug', '').trim();
    const commandVm = spinner(`Command: ${cmd}\n`);
    try {
      const commandResponse = await super.callCommands(serviceName, cmd);
      commandVm.succeed();
      logger.debug(`command cmd res: ${JSON.stringify(commandResponse)}`);
  
      if (commandResponse?.data?.stdout) {
        logger.log(commandResponse.data.stdout || '');
      }
      if (commandResponse?.data?.stderr) {
        logger.log(commandResponse.data.stderr || '', 'red');
      }
    } catch (ex) {
      commandVm.fail();
      throw ex;
    }
  }
}
