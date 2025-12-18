import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

interface IUserName {
  username: string
}

export interface IUserRegistrarsPermissions {
  userid: number
  users: IUserName
}

export interface IUsersRegistrarsPermissionsResponse {
  data: IUserRegistrarsPermissions[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}
