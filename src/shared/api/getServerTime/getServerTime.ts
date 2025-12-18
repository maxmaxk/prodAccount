import axios from 'axios'
import config from '@/app/config'

export const getServerTimeRequest = async (): Promise<string> => {
  return await axios.get(`${config.BACKEND_ADDRESS as string}rpc/get_current_server_time`, {
    withCredentials: true
  })
}
