import axios from 'axios'
import config from '@/app/config'

export const getLog1hPowerRequest = async (
  randomId: number,
  timestampStart: string,
  timestampEnd?: string
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }log_power_1h?registrarid=eq.${randomId}&bucket=gte.${timestampStart}${
      timestampEnd ? `&bucket=lte.${timestampEnd}` : ''
    }`,
    {
      withCredentials: true
    }
  )
}
