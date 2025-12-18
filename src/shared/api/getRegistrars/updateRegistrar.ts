import axios from 'axios'
import config from '@/app/config'
import { checkAutoLogin } from './model'

export const updateRegistrarsRequest = async (id: string, rowData: object): Promise<string> => {
  return await axios.patch(
    `${config.BACKEND_ADDRESS as string}registrars?randomid=eq.${id}`,
    checkAutoLogin(rowData),
    {
      withCredentials: true
    }
  )
}
