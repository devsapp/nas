import CommandBase from './command-base';
import { ICommandProps } from '../../interface';
interface IApts {
    localDir: string;
    fcDir: string;
    noUnzip: boolean;
    noClobber: boolean;
}
export default class Download extends CommandBase {
    cpFromNasToLocal(props: ICommandProps, apts: IApts): Promise<void>;
}
export {};
