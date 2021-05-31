import { HLogger, ILogger } from '@serverless-devs/core';
import { CONTEXT } from '../../constant';
import fs from 'fs';

export default class Component {
  @HLogger(CONTEXT) static logger: ILogger;

  static async remove(client, props) {
    const { function: functionConfig, triggers } = props;
    const { serviceName, functionName } = functionConfig;

    if (triggers) {
      for (const { triggerName } of triggers) {
        try {
          this.logger.debug('Delete trigger...');
          await client.deleteTrigger(serviceName, functionName, triggerName);
        } catch (ex) {
          this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        }
      }
    }

    try {
      this.logger.debug('Delete function...');
      await client.deleteFunction(serviceName, functionName);
    } catch (ex) {
      this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    }

    try {
      this.logger.debug('Delete service...');
      await client.deleteService(serviceName);
    } catch (ex) {
      this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    }
  }

  static async deploy(client, props) {
    const { service, function: functionConfig, triggers } = props;

    await this.makeService(client, service);

    await this.makeFunction(client, functionConfig);

    if (triggers) {
      for (const triggerConfig of triggers) {
        await this.makeTrigger(client, triggerConfig);
      }
    }
  }

  static async makeService(client, service) {
    const { serviceName } = service;

    try {
      this.logger.debug(`Create service ${serviceName}...`);
      await client.createService(serviceName, service);
      this.logger.debug(`Create service ${serviceName} success.`);
    } catch (ex) {
      if (ex.code !== 'ServiceAlreadyExists') {
        this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        throw ex;
      }

      this.logger.debug(`Update service ${serviceName}...`);
      await client.updateService(serviceName, service);
      this.logger.debug(`Update service ${serviceName} success.`);
    }
  }

  static async makeFunction(client, functionConfig) {
    const { serviceName, functionName, filename } = functionConfig;
    delete functionConfig.filename;
    functionConfig.code = {
      zipFile: fs.readFileSync(filename, 'base64'),
    };

    try {
      this.logger.debug(`Create function ${serviceName}/${functionName}...`);
      await client.updateFunction(serviceName, functionName, functionConfig);
      this.logger.debug(`Create function ${serviceName}/${functionName} success.`);
    } catch (ex) {
      if (ex.code === 'FunctionNotFound') {
        functionConfig.functionName = functionName;
        await client.createFunction(serviceName, functionConfig);
        return;
      }
      this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
      throw ex;
    }
  }

  static async makeTrigger(client, triggerConfig) {
    const { serviceName, functionName, triggerName } = triggerConfig;
    try {
      this.logger.debug(`Create trigger ${serviceName}/${functionName}/${triggerName}...`);
      await client.createTrigger(serviceName, functionName, triggerConfig);
      this.logger.debug(`Create trigger ${serviceName}/${functionName}/${triggerName} success.`);
    } catch (ex) {
      if (ex.code !== 'TriggerAlreadyExists') {
        this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        throw ex;
      }
      this.logger.debug(`Update trigger ${serviceName}/${functionName}/${triggerName}...`);
      await client.updateTrigger(serviceName, functionName, triggerName, triggerConfig);
      this.logger.debug(`Update trigger ${serviceName}/${functionName}/${triggerName} success.`);
    }
  }
}
