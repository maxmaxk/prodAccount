import axios from 'axios'
import config from '@/app/config'
import type { IRegistrar } from './types'
import { checkAutoLogin } from './model'

export const insertRegistrarsRequest = async (rowData: IRegistrar): Promise<string> => {
  return await axios.post(
    `${config.BACKEND_ADDRESS as string}registrars`,
    checkAutoLogin(rowData),
    {
      withCredentials: true
    }
  )
}
