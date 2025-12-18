import type { PaginationModel } from '@/shared/commonPagination/pagination'
import type { IFilterStore } from '@/shared/commonTypes/filterTypes'
import type { IOption } from '@/shared/commonTypes/optionTypes'
import { type IRow, type ISortStore, type ITableStore } from '@/shared/commonTypes/tableTypes'
import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'
import type { ETypeUser, IUser } from '@/shared/api/getUsers'
import type { IRegistrar } from '@/shared/api/getRegistrars'

export interface ILogStore extends ITableStore, ISortStore, IFilterStore {
  rows: (IRow & ILog)[]
  paginationModel: PaginationModel
  registrarsOptions: IOption<string>[]
  usersOptions: IOption<string>[]
  getLog: () => Promise<void>
  setAllRegistrars: (registrars: IRegistrar[]) => void
  setAllUsers: (users: IUser[]) => void
  getMessage: (item: ILogResponseItem) => string
  getMessageType: (item: ILogResponseItem) => IRowType
  setHandler: () => void
  changeSort: (field: number) => void
}

interface ILog {
  timestamp: string
  type: EEventType
  message: string
}

export interface IRowType {
  name: string
  className: string
}

export interface ILogType {
  [key: string]: IRowType
}

export interface ILogResponse {
  data: ILogResponseItem[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}

export interface ILogResponseItem {
  eventtype: EEventType
  timestamp: string
  servertimestamp: string
  login_username_registrar: string
  regid: number
  login_user_id: number | null
  login_rfid: number
  login_username_server: string
  reg_description: string
  users: {
    fullname: string
    type: ETypeUser
  }
}

export enum EEventType {
  AutoLoginSuccess = 'AutoLoginSuccess',
  AutoLoginFail = 'AutoLoginFail',
  LogoutSuccess = 'LogoutSuccess',
  LogoutFail = 'LogoutFail',
  LoginPasswordSuccess = 'LoginPasswordSuccess',
  LoginPasswordFail = 'LoginPasswordFail',
  LoginRfidSuccess = 'LoginRfidSuccess',
  LoginRfidFail = 'LoginRfidFail',
  AuthPasswordSuccess = 'AuthPasswordSuccess',
  AuthPasswordFail = 'AuthPasswordFail',
  AuthRfidSuccess = 'AuthRfidSuccess',
  AuthRfidFail = 'AuthRfidFail',
  AuthWebSuccess = 'AuthWebSuccess',
  AuthWebFail = 'AuthWebFail',
  LoginWebSuccess = 'LoginWebSuccess',
  LoginWebFail = 'LoginWebFail',
  LogoutWebSuccess = 'LogoutWebSuccess',
  LogoutWebFail = 'LogoutWebFail',
  DeviceOnline = 'DeviceOnline',
  DeviceOffline = 'DeviceOffline'
}

export enum ETypeMessage {
  Message = 'message',
  Notification = 'notification',
  Warning = 'warning',
  Error = 'error'
}
