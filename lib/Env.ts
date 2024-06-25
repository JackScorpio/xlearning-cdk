import { mapValues } from 'lodash'

export enum Env {
  Uat = 'Uat',
  Prod = 'Prod'
}

export const DomainName: { [key in Env]: string } = {
  [Env.Uat]: 'uat.xlearning.site',
  [Env.Prod]: 'xlearning.site'
}

enum ExportNames {
  hostedZoneIdExportName = 'HostedZoneId'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getExportNames = (env: Env) => mapValues(ExportNames, (value) => `XLearning${env}${value}`)

export const UatExportNames = getExportNames(Env.Uat)
export const ProdExportNames = getExportNames(Env.Prod)

export type Outputs = ReturnType<typeof getExportNames>
