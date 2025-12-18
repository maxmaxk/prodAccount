interface ISpecialReason {
  displayname: string
}

export enum EOpmode {
  Off = 'Off',
  ScheduledDowntime = 'Scheduled Downtime',
  UnexpectedDowntime = 'Unexpected Downtime',
  Uptime = 'Uptime',
  Disconnected = 'Disconnected'
}

export interface IReason {
  id: number
  name: string
  opmode: EOpmode
  displayname: string
  displayorder: number
  callservice: boolean
  timeout: number
  special_reasons: ISpecialReason
}
