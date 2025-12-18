import axios from 'axios'
import config from '@/app/config'

export const getShiftProductionDataRequest = async (
  randomId?: number,
  timestampStart?: string,
  timestampEnd?: string,
  shiftId?: number
): Promise<string> => {
  return await axios.get(
    `${config.BACKEND_ADDRESS as string}shift_production_data?select=*${
      randomId ? `&regid=eq.${randomId}` : ''
    }${timestampStart ? `&shift_start=gte.${timestampStart}` : ''}${
      timestampEnd ? `&shift_start=lt.${timestampEnd}` : ''
    }${shiftId ? `&shiftid=eq.${shiftId}` : ''}`,
    {
      withCredentials: true
    }
  )
}
