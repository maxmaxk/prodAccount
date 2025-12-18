import axios from 'axios'
import config from '@/app/config'

export const getLogProductionRequest = async (
  randomId?: number,
  timestampStart?: string,
  timestampEnd?: string,
  userid?: number,
  shiftid?: number
): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }log_production?select=*,items(code,displayname,tcooking,item_places),users(username)&order=timestamp${
      timestampEnd ? `&timestamp=lte.${timestampEnd}` : ''
    }${timestampStart ? `&timestamp=gte.${timestampStart}` : ''}${
      randomId ? `&registrarid=eq.${randomId}` : ''
    }${userid ? `&registrarid=eq.${userid}` : ''}${shiftid ? `&registrarid=eq.${shiftid}` : ''}`,
    {
      withCredentials: true
    }
  )
}
