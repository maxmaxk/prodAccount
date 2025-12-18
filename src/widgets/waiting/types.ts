export interface IWaiting {
  type: EWaitingType
}

export enum EWaitingType {
  Fixed,
  Absolute
}
