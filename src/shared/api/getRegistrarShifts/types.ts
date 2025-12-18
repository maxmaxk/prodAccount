interface IRegistrarShiftTitle {
  id: string
  title: string
}

export interface IRegistrarShift {
  id?: string
  regid: string
  shiftid: string
  shifts: IRegistrarShiftTitle
}
