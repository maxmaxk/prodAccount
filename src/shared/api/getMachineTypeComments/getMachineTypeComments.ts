import axios from 'axios'
import config from '@/app/config'
import { type IPagintationData, getPaginationUrl } from '@/shared/commonPagination'

export const getMachineTypeCommentsRequest = async (
  machineTypeId: number,
  pagination: IPagintationData | null = null,
  orderBy: string,
  urlFilter: string
): Promise<string> => {
  let url = `?machinetypeid=eq.${machineTypeId}`
  if (pagination === null) url += `&order=title${urlFilter}`
  else url += `&${getPaginationUrl(pagination)}&order=${orderBy}${urlFilter}`
  return await axios.get(`${config.BACKEND_ADDRESS as string}default_comments${url}`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
