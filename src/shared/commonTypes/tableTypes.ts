import type { IOption } from './optionTypes'

export type IRow = Record<string, any> & {
  id: string
  className: string
}

export enum ETypeColumn {
  Data,
  SelectRow,
  EditRow,
  EditComments,
  EditParams,
  EditRegistrars,
  EditReasons,
  EditShifts
}

export interface ITitle {
  typeColumn: ETypeColumn
  title: string
  width: string
  sort: ISortItem
}

export enum EDirSort {
  Na = 'na',
  Inc = 'inc',
  Dec = 'dec'
}

export interface ISortItem {
  hasSort: boolean
  dir?: EDirSort
  fieldsOrder?: Record<Exclude<EDirSort, EDirSort.Na>, string>
}

export interface ISortStore {
  orderBy: string
  setSort: (orderBy: string) => void
}

export enum EEditType {
  Select = 'select',
  SelectNumber = 'select-number',
  DateTime = 'datetime-local',
  Date = 'date',
  Time = 'time',
  Text = 'text',
  Password = 'password',
  Number = 'number',
  Checkbox = 'checkbox',
  Textarea = 'textarea'
}

export interface IEditFields {
  id?: string
  title: string
  field: string
  type: EEditType
  value: any
  valueDefault?: any
  readonly?: boolean
  required?: boolean
  null?: boolean
  options?: IOption<string | number>[]
  valueHi?: number
  valueLo?: number
  minValue?: number
  maxValue?: number
  notSave?: boolean
  dependOn?: string
  rows?: number
  width?: number
}

export interface IEditParams {
  featureid: string
  id?: string
  title: string
  value: boolean
  oldValue?: boolean
}

export interface ITableStore {
  titles: ITitle[]
  rows: IRow[]
  isLoading: boolean
  selectRows?: string[]
  chechAllFlag?: boolean
  selectEditRow?: string
  editFields?: IEditFields[]
  editParams?: IEditParams[]
  showEdit?: boolean
  showParams?: boolean
  showEditTitles?: boolean
  editRow?: (rowId: string) => void
  editComments?: (rowId: string) => void
  editReasons?: (rowId: string) => void
  editShifts?: (rowId: string) => void
  editRegistrarParams?: (rowId: string) => void
  editUserRegistrars?: (rowId: string) => void
  selectRow?: (rowId: string) => void
  getSelected?: (rowId: string) => boolean
  clearSelect?: () => void
  selectAll?: () => void
  getIdsSelectRows?: () => string
  deleteRows?: () => void
  changeSort: (field: number) => void
  setCheckAll?: () => void
  clearEditFields?: () => void
}
