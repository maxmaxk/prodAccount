import type { IOption } from '@/shared/commonTypes/optionTypes'

export enum EFilterType {
  Select = 'select',
  DateTime = 'datetime-local',
  Text = 'text',
  Number = 'Number'
}

export enum EOperation {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq',
  Is = 'is',
  Like = 'ilike'
}

export interface IFilter {
  name: string
  value?: string
  operation?: EOperation
  fieldName?: string
  placeHolder: string
  type: EFilterType
  width: string
  options?: IOption<string>[]
  fields?: any
}

export interface IFilterStore {
  filters: IFilter[]
  urlFilter: string
  changeFilter: (field: number, value: string) => Promise<void>
  setFilter: (urlFilter: string) => Promise<void>
  setOptionsByName?: (name: string, options: IOption<string>[]) => void
}
