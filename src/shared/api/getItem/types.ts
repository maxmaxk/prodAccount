import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export interface IItemsResponse {
  data: IItem[]
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
}

export interface IItem {
  id: number
  code: string
  displayname: string
  tcooking: number
  shiftplan: string
  tup: string
  tdown: string
  pressure: string
  usagerate: string
  weight: string
  bagging: string
  ts: string
  item_places: number
  errors: string
}
