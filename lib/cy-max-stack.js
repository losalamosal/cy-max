const cdk = require('@aws-cdk/core');
const cy_service = require('../lib/cy-service');

class CyMaxStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new cy_service.CyMaxService(this, 'CyMax');
  }
}

module.exports = { CyMaxStack }
