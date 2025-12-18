import axios from 'axios'
import config from '@/app/config'

export const deleteReasonsRequest = async (ids: string): Promise<string> => {
  return await axios.delete(`${config.BACKEND_ADDRESS as string}dt_reasons?id=in.(${ids})`, {
    withCredentials: true
  })
}
