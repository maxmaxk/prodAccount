import axios from 'axios'
import config from '@/app/config'
import type { IPagintationData } from '@/shared/commonPagination/types'
import { getPaginationUrl } from '@/shared/commonPagination/paginationUrl'

export const getRegistrarsRequest = async (
  pagination: IPagintationData | null = null,
  orderBy: string,
  urlFilter: string,
  workshopFilter: number,
  userId: number
): Promise<string> => {
  let url
  if (pagination === null) url = `?order=description${urlFilter}`
  else
    url = `?${getPaginationUrl(pagination)}&order=${orderBy}${urlFilter}${
      workshopFilter >= 0 ? `&workshopid=eq.${workshopFilter}` : ''
    }${`&select=*,workshops(title),machine_types(title)`}${
      userId >= 0
        ? `,users_registrars_permissions!inner(userid)&users_registrars_permissions.userid=eq.${userId}&users_registrars_permissions.can_view=eq.true`
        : ''
    }`
  return await axios.get(`${config.BACKEND_ADDRESS as string}registrars${url}`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
