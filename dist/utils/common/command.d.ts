import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../../interface';
export default class Command {
    fcClient: any;
    logger: ILogger;
    constructor(regionId: string, credentials: ICredentials);
    command(props: any): Promise<void>;
}
