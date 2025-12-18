import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export interface IRegistrarsFeatures {
  id: string
  featureid: number
}

export interface IRegistrarsFeaturesResponse {
  data: IRegistrarsFeatures[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}
