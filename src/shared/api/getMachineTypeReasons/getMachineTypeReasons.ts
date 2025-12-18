import axios from 'axios'
import config from '@/app/config'

export const getMachineTypeReasonsRequest = async (
  id: string,
  mtid: string,
  orderBy: string
): Promise<string> => {
  let url = ''
  if (id) url = `&id=eq.${id}`
  if (mtid) url = `&mtid=eq.${mtid}`
  if (orderBy) url += `&order=${orderBy}`
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }machine_type_dt_reasons?select=id,mtid,reasonid,dt_reasons(id,displayname)${url}`,
    {
      withCredentials: true,
      headers: { Prefer: 'count=exact' }
    }
  )
}
