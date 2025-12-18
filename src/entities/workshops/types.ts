import type { IWorkshop } from '@/shared/api/getWorkshops'
import type { PaginationModel } from '@/shared/commonPagination/pagination'
import type { IFilterStore } from '@/shared/commonTypes/filterTypes'
import type { IOption } from '@/shared/commonTypes/optionTypes'
import type { ISortStore, ITableStore } from '@/shared/commonTypes/tableTypes'
import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export interface IWorkshopsStore extends ITableStore, ISortStore, IFilterStore {
  paginationModel: PaginationModel
  workshops: IWorkshop[]
  workshopsFilterOptions: IOption<number>[]
  isLoading: boolean
  getWorkshops: () => Promise<void>
  getAllWorkshops: () => Promise<void>
  deleteWorkshops: () => Promise<void>
  insertWorkshop: (rowData: IWorkshop) => Promise<boolean>
  updateWorkshop: (rowData: IWorkshop) => Promise<boolean | undefined>
  setHandler: () => void
}

export interface IWorkshopsResponse {
  data: IWorkshop[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}
