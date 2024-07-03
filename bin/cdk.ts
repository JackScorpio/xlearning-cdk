#!/usr/bin/env node
import type { Environment } from 'aws-cdk-lib'
import * as cdk from 'aws-cdk-lib'

import EmailReceivingStack from '../lib/EmailReceivingStack'
import { Env, ProdExportNames, UatExportNames } from '../lib/Env'
import HostedZoneStack from '../lib/HostedZoneStack'

const app = new cdk.App()

const env: Environment = {
  account: '124647807645',
  region: 'us-east-1'
}

new HostedZoneStack(app, Env.Uat, UatExportNames, {
  stackName: 'XLearningHostedZoneStackUat',
  description: 'This stack includes resources needed to create the hosted zone into this environment',
  env
})

new HostedZoneStack(app, Env.Prod, ProdExportNames, {
  stackName: 'XLearningHostedZoneStackProd',
  description: 'This stack includes resources needed to create the hosted zone into this environment',
  env
})

new EmailReceivingStack(app, ProdExportNames.hostedZoneIdExportName, {
  stackName: 'XLearningEmailReceivingStack',
  description: 'This stack includes resources needed to create the email receiving service into this environment',
  env
})
