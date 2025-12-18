import type { IWorkDayOverrides } from '@/shared/api/getWorkDayOverrides'
import type { ISortStore, ITableStore } from '@/shared/commonTypes/tableTypes'
import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export interface IWorkDayOverridesStore extends ITableStore, ISortStore {
  workDayOverrides: IWorkDayOverrides[]
  isLoading: boolean
  shiftId: string
  getWorkDayOverrides: () => Promise<void>
  deleteWorkDayOverrides: () => Promise<void>
  insertWorkDayOverrides: (rowData: IWorkDayOverrides) => Promise<boolean>
  updateWorkDayOverrides: (rowData: IWorkDayOverrides) => Promise<boolean | undefined>
}

export interface IWorkDayOverridesResponse {
  data: IWorkDayOverrides[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}
