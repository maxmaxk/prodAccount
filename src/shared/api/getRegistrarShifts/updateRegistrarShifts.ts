import axios from 'axios'
import config from '@/app/config'
import type { IRegistrarShift } from '.'

export const updateRegistrarShiftsRequest = async (
  id: string,
  rowData: IRegistrarShift
): Promise<string> => {
  return await axios.patch(
    `${config.BACKEND_ADDRESS as string}registrars_shifts?id=eq.${id}`,
    rowData,
    {
      withCredentials: true
    }
  )
}
