import type { IUser } from '@/shared/api/getUsers'
import type { IShiftStatusCommon } from '@/entities/registrarStatus/types'
import * as am5 from '@amcharts/amcharts5'
import type { IStatusData } from '@/entities/registrar/types'
import type { IIntervalTotals } from '@/shared/api/getIntervalTotals/types'

export interface IUserStatusStore {
  isLoading: boolean
  user: IUser | null
  userId: number
  serverDeltaTime: number
  userRegistrars: IUserRegistrar[]
  userStatistic: IUserStatistic
  userPerformance: IShiftStatus[]
  shiftData: TShiftData
  setUserId: (userId: number) => Promise<void>
  getUserRegistrars: () => Promise<void>
  clearData: () => void
  setUserPerformance: (userPerformance: IShiftStatusCommon[]) => void
  getTotals: (shift: IShiftStatus) => Promise<void>
  dataStatistic: (shift: IShiftStatus, statusSeries: am5.ListData<IStatusData>) => Promise<void>
  getStatusData: (shift: IShiftStatus) => Promise<void>
  setServerDeltaTime: (serverDeltaTime: number) => void
}

export type TShiftData = Map<IShiftStatus, am5.ListData<IStatusData>>

export interface IUserStatistic {
  totalDetails: number
}

export interface IUserRegistrarsResponse {
  data: IUserRegistrar[]
}

export interface IUserRegistrar {
  randomid: number
  description: string
}

export interface IShiftStatus extends IShiftStatusCommon {
  totals?: IIntervalTotals
}
