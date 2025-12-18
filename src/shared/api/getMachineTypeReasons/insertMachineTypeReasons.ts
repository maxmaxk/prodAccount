import axios from 'axios'
import config from '@/app/config'
import type { IMachineTypeReason } from '.'

export const insertMachineTypeReasonsRequest = async (
  rowData: IMachineTypeReason
): Promise<string> => {
  return await axios.post(`${config.BACKEND_ADDRESS as string}machine_type_dt_reasons`, rowData, {
    withCredentials: true
  })
}
