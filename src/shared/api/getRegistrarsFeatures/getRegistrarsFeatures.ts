import axios from 'axios'
import config from '@/app/config'

export const getRegistrarsFeaturesRequest = async (regid: number): Promise<string> => {
  return await axios.get(
    `${config.BACKEND_ADDRESS as string}registrars_features?regid=eq.${regid}`,
    {
      withCredentials: true,
      headers: { Prefer: 'count=exact' }
    }
  )
}
