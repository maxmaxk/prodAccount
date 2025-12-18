import axios from 'axios'
import config from '@/app/config'
import type { EGranularity } from './types'

export const getPowerLogSummaryRequest = async (
  timestampStart: string,
  interval: string,
  granularity: EGranularity,
  workshopId: number,
  machinetypeId: number
): Promise<string> => {
  const url = `?_start_time=${timestampStart}&_granularity=${granularity}&_interval=${interval}${
    workshopId >= 0 ? `&_workshop_id=${workshopId}` : ''
  }${machinetypeId >= 0 ? `&_machine_type_id=${machinetypeId}` : ''}`
  return await axios.get(`${config.BACKEND_ADDRESS as string}rpc/get_power_log_summary${url}`, {
    withCredentials: true
  })
}
