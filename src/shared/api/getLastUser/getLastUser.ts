import axios from 'axios'
import config from '@/app/config'

export const getLastUserRequest = async (
  randomId: number,
  timestampStart: string
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }rpc/get_logged_in_user?_regid=${randomId}&_time=${timestampStart}`,
    {
      withCredentials: true
    }
  )
}
