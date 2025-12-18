import axios from 'axios'
import config from '@/app/config'

export const deleteRegistrarShiftsRequest = async (ids: string): Promise<string> => {
  return await axios.delete(`${config.BACKEND_ADDRESS as string}registrars_shifts?id=in.(${ids})`, {
    withCredentials: true
  })
}
