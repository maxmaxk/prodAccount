import axios from 'axios'
import config from '@/app/config'

export const getUserProductionDataRequest = async (
  randomId?: number,
  timestampStart?: string,
  timestampEnd?: string,
  userId?: number,
  shiftId?: number
): Promise<string> => {
  return await axios.get(
    `${config.BACKEND_ADDRESS as string}user_production_data?select=*${
      randomId ? `&regid=eq.${randomId}` : ''
    }${timestampStart ? `&shift_start=gte.${timestampStart}` : ''}${
      timestampEnd ? `&shift_start=lt.${timestampEnd}` : ''
    }${shiftId ? `&shiftid=eq.${shiftId}` : ''}${userId ? `&userid=eq.${userId}` : ''}`,
    {
      withCredentials: true
    }
  )
}
