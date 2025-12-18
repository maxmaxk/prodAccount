import axios from 'axios'
import config from '@/app/config'

export const getLogMachineTimelineRequest = async (
  randomId: number,
  timestampStart: string,
  timestampEnd?: string
): Promise<string> => {
  const url = `?regid=eq.${randomId}&and=(${`start_time.gte.${timestampStart}`}${
    timestampEnd ? `,start_time.lte.${timestampEnd}` : ''
  })`
  return await axios.get(`${config.BACKEND_ADDRESS as string}log_combined_item_timeline${url}`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
