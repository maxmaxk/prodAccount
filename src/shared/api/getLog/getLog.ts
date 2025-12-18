import axios from 'axios'
import config from '@/app/config'
import type { IPagintationData } from '@/shared/commonPagination/types'
import { getPaginationUrl } from '@/shared/commonPagination/paginationUrl'

export const getLogRequest = async (
  pagination: IPagintationData | null,
  orderBy: string,
  urlFilter: string
): Promise<string> => {
  return await axios.get(
    `${config.BACKEND_ADDRESS as string}log_auth_and_conn_2?order=${orderBy}${
      pagination ? `&${getPaginationUrl(pagination)}` : ''
    }${urlFilter}`,
    {
      withCredentials: true,
      headers: { Prefer: 'count=exact' }
    }
  )
}
