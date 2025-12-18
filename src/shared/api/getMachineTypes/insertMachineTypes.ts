import axios from 'axios'
import config from '@/app/config'
import type { IMachineType } from '.'

export const insertMachineTypesRequest = async (rowData: IMachineType): Promise<string> => {
  return await axios.post(`${config.BACKEND_ADDRESS as string}machine_types`, rowData, {
    withCredentials: true
  })
}
