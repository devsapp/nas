import CommandBase from './command-base';
export default class Command extends CommandBase {
    command(serviceName: string, args: string): Promise<void>;
}
