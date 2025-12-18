import axios from 'axios'
import config from '@/app/config'
import type { IMachineTypeComment } from '.'

export const updateMachineTypeCommentRequest = async (
  id: string,
  rowData: IMachineTypeComment
): Promise<string> => {
  return await axios.patch(
    `${config.BACKEND_ADDRESS as string}default_comments?id=eq.${id}`,
    rowData,
    {
      withCredentials: true
    }
  )
}
