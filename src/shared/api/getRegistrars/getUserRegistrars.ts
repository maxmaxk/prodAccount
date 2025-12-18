import axios from 'axios'
import config from '@/app/config'

export const getUserRegistrarsRequest = async (userId: number): Promise<string> => {
  return await axios.get(
    `${
      config.BACKEND_ADDRESS as string
    }registrars?select=randomid,description,users_registrars_permissions!inner()&users_registrars_permissions.userid=eq.${userId}&users_registrars_permissions.can_login=eq.true`,
    {
      withCredentials: true
    }
  )
}
