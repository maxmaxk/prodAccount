import axios from 'axios'
import config from '@/app/config'

export const deleteMachineTypeReasonsRequest = async (ids: string): Promise<string> => {
  return await axios.delete(
    `${config.BACKEND_ADDRESS as string}machine_type_dt_reasons?id=in.(${ids})`,
    {
      withCredentials: true
    }
  )
}
