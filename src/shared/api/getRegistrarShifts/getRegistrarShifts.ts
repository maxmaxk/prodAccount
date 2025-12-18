import axios from 'axios'
import config from '@/app/config'

export const getRegistrarShiftsRequest = async (
  id: string,
  regid: string,
  orderBy: string
): Promise<string> => {
  let url = ''
  if (id) url = `&id=eq.${id}`
  if (regid) url = `&regid=eq.${regid}`
  if (orderBy) url += `&order=${orderBy}`
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }registrars_shifts?select=id,regid,shiftid,shifts(id,title)${url}`,
    {
      withCredentials: true,
      headers: { Prefer: 'count=exact' }
    }
  )
}
