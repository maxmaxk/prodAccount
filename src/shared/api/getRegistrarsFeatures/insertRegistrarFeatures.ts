import axios from 'axios'
import config from '@/app/config'

export const insertRegistrarsFeaturesRequest = async (data: object): Promise<string> => {
  return await axios.post(`${config.BACKEND_ADDRESS as string}registrars_features`, data, {
    withCredentials: true
  })
}
