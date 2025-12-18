import type { IShift } from '@/shared/api/getShifts'
import type { ETypeUser, IUser } from '@/shared/api/getUsers/types'
import type { PaginationModel } from '@/shared/commonPagination/pagination'
import type { IFilterStore } from '@/shared/commonTypes/filterTypes'
import type { IOption } from '@/shared/commonTypes/optionTypes'
import type { IEditFields, ISortStore, ITableStore } from '@/shared/commonTypes/tableTypes'
import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export interface IUsersStore extends ITableStore, ISortStore, IFilterStore {
  users: IUser[] | never[]
  allUsers: IUser[]
  isLoading: boolean
  workshopFilter: number
  paginationModel: PaginationModel
  showEditRegistrars: boolean
  shiftsOptions: IOption<string>[]
  getUsers: () => Promise<void>
  getAllUsers: () => Promise<void>
  deleteUsers: () => Promise<void>
  insertUser: (rowData: IUser) => Promise<boolean>
  saveUser: () => Promise<void>
  updateUser: (rowData: IUser) => Promise<boolean | undefined>
  setOptionsByEditName: (fieldName: string, options: IOption<string>[]) => void
  setHandler: () => void
  setAllShifts: (shifts: IShift[]) => void
  checkDepend: (edit: IEditFields) => boolean
  getHumanUserType: (typeUser: ETypeUser) => string
}

export interface IUsersResponse {
  data: IUser[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}
