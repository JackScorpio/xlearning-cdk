import * as cdk from 'aws-cdk-lib'
import { CfnOutput } from 'aws-cdk-lib'
import type { HostedZone } from 'aws-cdk-lib/aws-route53'
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53'
import type { Construct } from 'constructs'

import type { Env, Outputs } from './Env'
import { DomainName } from './Env'

class HostedZoneStack extends cdk.Stack {
  constructor(
    readonly scope: Construct,
    readonly env: Env,
    readonly outputs: Outputs,
    readonly props: cdk.StackProps
  ) {
    super(scope, props.stackName, props)
    const zone = this.createHostedZone()
    this.exportHostedZoneId(zone)
  }

  private exportHostedZoneId(hostedZone: HostedZone): void {
    new CfnOutput(this, `XLearning-HostedZoneId-Output-${this.env}`, {
      exportName: this.outputs.hostedZoneIdExportName,
      value: hostedZone.hostedZoneId
    })
  }

  private createHostedZone(): PublicHostedZone {
    return new PublicHostedZone(this, `XLearning-HostedZone-${this.env}`, {
      zoneName: DomainName[this.env]
    })
  }
}

export default HostedZoneStack
