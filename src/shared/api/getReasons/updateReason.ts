import axios from 'axios'
import config from '@/app/config'
import type { IReason } from '.'

export const updateReasonsRequest = async (id: string, rowData: IReason): Promise<string> => {
  return await axios.patch(`${config.BACKEND_ADDRESS as string}dt_reasons?id=eq.${id}`, rowData, {
    withCredentials: true
  })
}
