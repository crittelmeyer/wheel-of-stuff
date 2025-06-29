#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WheelOfStuffStack } from '../lib/wheel-of-stuff-stack';

const app = new cdk.App();

const environment = app.node.tryGetContext('environment') || 'prod';

new WheelOfStuffStack(app, `WheelOfStuffBackend${environment.charAt(0).toUpperCase() + environment.slice(1)}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  environment,
});