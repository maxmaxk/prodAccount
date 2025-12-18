export interface IIntervalTotalsResponse {
  data: IIntervalTotals
}

export interface IIntervalTotals {
  current: number
  power: number
  energy: number
  items_produced: number
  items_defective: number
}
