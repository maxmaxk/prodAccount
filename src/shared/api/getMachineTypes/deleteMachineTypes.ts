import axios from 'axios'
import config from '@/app/config'

export const deleteMachineTypesRequest = async (ids: string): Promise<string> => {
  return await axios.delete(`${config.BACKEND_ADDRESS as string}machine_types?id=in.(${ids})`, {
    withCredentials: true
  })
}
