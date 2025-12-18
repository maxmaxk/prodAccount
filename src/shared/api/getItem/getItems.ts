import axios from 'axios'
import config from '@/app/config'
import type { IPagintationData } from '@/shared/commonPagination/types'
import { getPaginationUrl } from '@/shared/commonPagination/paginationUrl'

export const getItemsRequest = async (
  pagination: IPagintationData | null = null,
  orderBy: string,
  urlFilter: string
): Promise<string> => {
  let url
  if (pagination === null) url = `?order=title${urlFilter}`
  else url = `?${getPaginationUrl(pagination)}&order=${orderBy}${urlFilter}`
  return await axios.get(`${config.BACKEND_ADDRESS as string}items${url}`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
