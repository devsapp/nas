import _ from 'lodash';
import { ICommandProps, isVpcConfig } from '../../interface';

export function checkInputs(props: ICommandProps) {
  const {
    regionId,
    serviceName,
    vpcConfig,
    mountPoints,
  } = props || {};
  if (_.isEmpty(regionId)) throw new Error('Parameter is missing regionId');
  if (_.isEmpty(serviceName)) throw new Error('Parameter is missing serviceName');
  if (!isVpcConfig(vpcConfig)) throw new Error(`The parameter vpcConfig does not meet expectations: \n${JSON.stringify(vpcConfig || {}, null, 2)}`);
  if (!_.isArray(mountPoints) || _.isEmpty(mountPoints)) throw new Error('The parameter mountPoints does not meet expectations');
}
