import axios from 'axios'
import config from '@/app/config'

export const getDtReasonsRequest = async (): Promise<string> => {
  return await axios.get(`${config.BACKEND_ADDRESS as string}dt_reasons`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
