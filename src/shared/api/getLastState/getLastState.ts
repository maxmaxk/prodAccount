import axios from 'axios'
import config from '@/app/config'

export const getLastStateRequest = async (
  randomId: number,
  timestampStart: string
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }rpc/get_last_state_before?_regid=${randomId}&_time=${timestampStart}`,
    {
      withCredentials: true,
      headers: { Prefer: 'count=exact' }
    }
  )
}
