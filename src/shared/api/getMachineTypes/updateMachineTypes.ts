import axios from 'axios'
import config from '@/app/config'
import type { IMachineType } from '.'

export const updateMachineTypesRequest = async (
  id: string,
  rowData: IMachineType
): Promise<string> => {
  return await axios.patch(
    `${config.BACKEND_ADDRESS as string}machine_types?id=eq.${id}`,
    rowData,
    {
      withCredentials: true
    }
  )
}
