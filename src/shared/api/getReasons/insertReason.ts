import axios from 'axios'
import config from '@/app/config'
import type { IReason } from '.'

export const insertReasonsRequest = async (rowData: IReason): Promise<string> => {
  return await axios.post(`${config.BACKEND_ADDRESS as string}dt_reasons`, rowData, {
    withCredentials: true
  })
}
