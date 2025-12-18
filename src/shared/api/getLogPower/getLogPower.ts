import axios from 'axios'
import config from '@/app/config'

export const getLogPowerRequest = async (
  randomId: number,
  timestampStart: string,
  timestampEnd?: string
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }log_power?registrarid=eq.${randomId}&timestamp=gte.${timestampStart}${
      timestampEnd ? `&bucket=lte.${timestampEnd}` : ''
    }`,
    {
      withCredentials: true
    }
  )
}
