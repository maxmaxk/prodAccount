import axios from 'axios'
import config from '@/app/config'

export const deleteRegistrarsRequest = async (ids: string): Promise<string> => {
  return await axios.delete(`${config.BACKEND_ADDRESS as string}registrars?randomid=in.(${ids})`, {
    withCredentials: true
  })
}
