const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const CyMax = require('../lib/cy-max-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CyMax.CyMaxStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
