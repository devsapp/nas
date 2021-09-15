// import * as core from '@serverless-devs/core';

import logger from './common/logger';
import Base from './common/base';
import InitHelperService from './lib/ensure-nas-dir-helper-service';
import { getCredential } from './utils';
import { IInputs } from './interface';

export default class NasCompoent extends Base {
  /**
   * 初始化辅助函数，并且确保目录存在
   * @param inputs 参数对标 deploy
   */
  async initHelperService(inputs: IInputs) {
    logger.debug(`input.props: ${JSON.stringify(inputs.props)}, inputs.args: ${inputs.args}`);
    const credentials = await getCredential(inputs.credentials, inputs);

    const initHelperService = new InitHelperService(credentials, inputs.props?.regionId);
    await initHelperService.init(inputs);
  }
}

