import axios from 'axios'
import config from '@/app/config'

export const getLogDailyProductionRequest = async (
  randomId?: number,
  timestampStart?: string,
  timestampEnd?: string,
  userId?: number,
  shiftId?: number
): Promise<string> => {
  return await axios.get(
    `${config.BACKEND_ADDRESS as string}log_production_daily?order=bucket${
      randomId ? `&registrarid=eq.${randomId}` : ''
    }${timestampStart ? `&bucket=gte.${timestampStart}` : ''}${
      timestampEnd ? `&bucket=lte.${timestampEnd}` : ''
    }${userId ? `&userid=eq.${userId}` : ''}${shiftId ? `&shiftid=eq.${shiftId}` : ''}`,
    {
      withCredentials: true
    }
  )
}
