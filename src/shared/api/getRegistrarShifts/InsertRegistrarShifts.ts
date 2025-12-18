import axios from 'axios'
import config from '@/app/config'
import type { IRegistrarShift } from '.'

export const insertRegistrarShiftsRequest = async (rowData: IRegistrarShift): Promise<string> => {
  return await axios.post(`${config.BACKEND_ADDRESS as string}registrars_shifts`, rowData, {
    withCredentials: true
  })
}
