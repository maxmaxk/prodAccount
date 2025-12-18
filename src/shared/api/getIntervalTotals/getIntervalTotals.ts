import axios from 'axios'
import config from '@/app/config'
import moment from 'moment'

export const getIntervalTotalsRequest = async (
  userid: number,
  registrarid: number,
  startTime: string,
  interval: string | null,
  workshopid?: number,
  machinetypeid?: number
): Promise<string> => {
  const url = `?_start=${moment(startTime).format('YYYY-MM-DDTHH:mm:SS')}&_interval=${interval}${
    workshopid && workshopid >= 0 ? `&_workshop_id=${workshopid}` : ''
  }${userid >= 0 ? `&_user_id=${userid}` : ''}${
    registrarid >= 0 ? `&_registrar_id=${registrarid}` : ''
  }${machinetypeid && machinetypeid >= 0 ? `&_machinetype_id=${machinetypeid}` : ''}`
  return await axios.get(`${config.BACKEND_ADDRESS as string}rpc/get_interval_totals${url}`, {
    withCredentials: true
  })
}
