import * as core from '@serverless-devs/core';
import _ from 'lodash';
import { IInputs } from '../interface';

export default class FcDeploy {
  static genComponentInputs(inputs, props): IInputs {
    const inputsCopy = _.cloneDeep(inputs);
    inputsCopy.props = props;
    inputsCopy.args = '-y --use-local';

    return inputsCopy;
  }

  async loadComponent() {
    return await core.loadComponent('devsapp/fc-deploy');
  }

  async deploy(inputs: IInputs) {
    const fcDeploy = await this.loadComponent();
    return fcDeploy.deploy(inputs);
  }
}
