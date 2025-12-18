interface IMachineTypeReasonName {
  id: string
  displayname: string
}

export interface IMachineTypeReason {
  id?: string
  mtid: string
  reasonid: string
  dt_reasons: IMachineTypeReasonName
}
