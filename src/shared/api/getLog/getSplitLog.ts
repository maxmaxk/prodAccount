import axios from 'axios'
import config from '@/app/config'

export const getSplitLogRequest = async (
  randomId: number,
  timestampStart: string,
  timestampEnd?: string
): Promise<string> => {
  const url = `?select=*,users(fullname,type)&regid=eq.${randomId}&and=(${`timestamp.gte.${timestampStart}`}${
    timestampEnd ? `,timestamp.lte.${timestampEnd}` : ''
  })&order=timestamp.asc`
  return await axios.get(`${config.BACKEND_ADDRESS as string}log_auth_and_conn_2${url}`, {
    withCredentials: true
  })
}
