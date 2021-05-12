import { ILogger } from '@serverless-devs/core';
export default class Component {
    static logger: ILogger;
    static remove(client: any, props: any): Promise<void>;
    static deploy(client: any, props: any): Promise<void>;
    static makeService(client: any, service: any): Promise<void>;
    static makeFunction(client: any, functionConfig: any): Promise<void>;
    static makeTrigger(client: any, triggerConfig: any): Promise<void>;
}
