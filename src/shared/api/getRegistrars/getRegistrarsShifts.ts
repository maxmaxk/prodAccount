import axios from 'axios'
import config from '@/app/config'

export const getRegistrarsShiftsRequest = async (registrarId: number): Promise<string> => {
  const url = `?regid=eq.${registrarId}&select=*,shifts(id,title,dinner_duration,break_duration,clean_duration,change_duration,service_duration)&order=shifts(title)`
  return await axios.get(`${config.BACKEND_ADDRESS as string}registrars_shifts${url}`, {
    withCredentials: true,
    headers: { Prefer: 'count=exact' }
  })
}
