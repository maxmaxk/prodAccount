export interface IGetTokenResponse {
  data: {
    token: string
  }
}

export interface IWsEvent {
  data: string
}

export interface IWsData {
  result?: string
  topic?: string
  payload?: Record<string, any>
}

export interface IStateChangeEvent {
  registrarid: number
  opModeCode: EOpModeCode
  downtimeReasonCode: number
  ts: string
  username?: string
  userId?: number
  itemid?: number
}

export interface IProductAddEvent {
  registrarid: number
  itemCount: number
  defectiveItemCount: number
  energyConsumed: number
  userid: number
  ts: string
}

export interface IPowerChangeEvent {
  registrarid: number
  current: number
  energy: number
  power: number
  ts: string
}

export enum EOpModeCode {
  Off = 0,
  ScheduledDowntime = 1,
  UnexpectedDowntime = 2,
  Uptime = 3
}
