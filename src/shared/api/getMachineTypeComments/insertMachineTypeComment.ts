import axios from 'axios'
import config from '@/app/config'
import type { IMachineTypeComment } from '.'

export const insertMachineTypeCommentRequest = async (
  rowData: IMachineTypeComment
): Promise<string> => {
  return await axios.post(`${config.BACKEND_ADDRESS as string}default_comments`, rowData, {
    withCredentials: true
  })
}
