import axios from 'axios'
import config from '@/app/config'

export const getCurrentUserRequest = async (): Promise<string> => {
  return await axios.get(`${config.BACKEND_ADDRESS as string}rpc/get_current_user`, {
    withCredentials: true
  })
}
