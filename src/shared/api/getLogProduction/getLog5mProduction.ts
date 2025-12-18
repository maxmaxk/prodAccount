import axios from 'axios'
import config from '@/app/config'

export const getLog5mProductionRequest = async (
  randomId: number,
  timestampStart: string,
  timestampEnd?: string
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }log_production_5min?registrarid=eq.${randomId}&bucket=gte.${timestampStart}${
      timestampEnd ? `&bucket=lte.${timestampEnd}` : ''
    }`,
    {
      withCredentials: true
    }
  )
}
