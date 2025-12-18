import axios from 'axios'
import config from '@/app/config'

export const deleteMachineTypeCommentsRequest = async (ids: string): Promise<string> => {
  return await axios.delete(`${config.BACKEND_ADDRESS as string}default_comments?id=in.(${ids})`, {
    withCredentials: true
  })
}
