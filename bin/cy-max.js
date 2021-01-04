#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CyMaxStack } = require('../lib/cy-max-stack');

const app = new cdk.App();
new CyMaxStack(app, 'CyMaxStack');
