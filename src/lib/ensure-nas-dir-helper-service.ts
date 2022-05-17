import _ from 'lodash';
import { RemoveHelperServiceInputs, isRemoveHelperServiceProps } from '../interface';
import FcDeploy from './fc-deploy';

const getServiceName = (name: string) => `_FC_NAS_${name}-ensure-nas-dir-exist-service`;

export default class EnsureNasDirHelperService extends FcDeploy {
  async remove(inputs: RemoveHelperServiceInputs) {
    if (!isRemoveHelperServiceProps(inputs.props)) {
      throw new Error('Remove helper service regionId and serviceName must exist');
    }

    const inputsCopy: any = _.cloneDeep(inputs);
    inputsCopy.props = {
      region: inputs.props.regionId,
      service: {
        name: getServiceName(inputs.props.serviceName),
      },
    };

    inputsCopy.args = '-y';
    await super.remove(inputsCopy);
  }
}
