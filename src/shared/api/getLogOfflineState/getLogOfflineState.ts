import axios from 'axios'
import config from '@/app/config'

export const getLogOffineStateRequest = async (
  randomId: number,
  timestampStart: string
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }log_connections?registrarid=eq.${randomId}&timestamp=gte.${timestampStart}&online=eq.false`,
    {
      withCredentials: true,
      headers: { Prefer: 'count=exact' }
    }
  )
}
