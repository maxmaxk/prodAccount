import axios from 'axios'
import config from '@/app/config'
import type { IMachineTypeReason } from '.'

export const updateMachineTypeReasonsRequest = async (
  id: string,
  rowData: IMachineTypeReason
): Promise<string> => {
  return await axios.patch(
    `${config.BACKEND_ADDRESS as string}machine_type_dt_reasons?id=eq.${id}`,
    rowData,
    {
      withCredentials: true
    }
  )
}
