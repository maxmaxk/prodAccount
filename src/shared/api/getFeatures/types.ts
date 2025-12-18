import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export interface IFeatures {
  id: number
  name: string
  displayname: string
}

export interface IFeaturesResponse {
  data: IFeatures[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}
