import _ from 'lodash';
import logger from '../../common/logger';
import { makeSureNasUriStartWithSlash } from './utils';

const FC_DIR = '/mnt/auto';

export default class ParameterAdaptation {
  static adapta01(props) {
    logger.debug(`input.props: ${JSON.stringify(props)}`);
    const newProps = _.cloneDeep(props);
    const {
      serviceName,
      vpcId,
      vSwitchId,
      securityGroupId,
      mountPointDomain,
      nasDir,
      fcDir,
    } = newProps;
    const pickArr = [];

    if (_.isString(vpcId)) {
      newProps.vpcConfig = {
        vpcId,
        securityGroupId,
        vSwitchIds: _.isString(vSwitchId) ? [vSwitchId] : vSwitchId,
      };
      pickArr.push('vpcId', 'securityGroupId', 'vSwitchId');
    }

    if (_.isString(mountPointDomain)) {
      if (_.isEmpty(props.mountPoints)) {
        newProps.mountPoints = [{
          serverAddr: mountPointDomain,
          nasDir: makeSureNasUriStartWithSlash(nasDir || serviceName),
          fcDir: fcDir || FC_DIR,
        }];
      }
      pickArr.push('mountPointDomain', 'nasDir', 'fcDir');
    }

    if (_.has(newProps, 'vpcConfig.vswitchIds')) {
      newProps.vpcConfig.vSwitchIds = newProps.vpcConfig.vswitchIds;
    }

    return _.omit(newProps, pickArr);
  }
}
