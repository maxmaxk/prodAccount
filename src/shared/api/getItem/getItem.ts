import axios from 'axios'
import config from '@/app/config'

export const getItemRequest = async (itemid: number): Promise<string> => {
  return await axios.get(`${config.BACKEND_ADDRESS as string}items?id=eq.${itemid}`, {
    withCredentials: true
  })
}
