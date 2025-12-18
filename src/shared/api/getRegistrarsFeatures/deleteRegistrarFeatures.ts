import axios from 'axios'
import config from '@/app/config'

export const deleteRegistrarsFeaturesRequest = async (ids: string): Promise<string> => {
  return await axios.delete(
    `${config.BACKEND_ADDRESS as string}registrars_features?id=in.(${ids})`,
    {
      withCredentials: true
    }
  )
}
