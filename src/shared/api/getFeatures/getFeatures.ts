import axios from 'axios'
import config from '@/app/config'

export const getFeaturesRequest = async (): Promise<string> => {
  return await axios.get(`${config.BACKEND_ADDRESS as string}features?order=displayname`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
