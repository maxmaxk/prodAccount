import type { EOpmode } from '@/entities/registrar/types'
import type { ITotals } from '@/entities/registrarStatus/types'

export interface IColorPercentPanel {
  panels: IPanels[]
}

export interface IPanels {
  title: string
  opmode: EOpmode
  statField: keyof ITotals
}
