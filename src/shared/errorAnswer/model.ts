import type { IUserStore } from '@/entities/user/types'
import type { IErrorAnswer, IMessageMap } from './types'

export const errorAnswer = (err: IErrorAnswer, userStore: IUserStore): string => {
  const msg = err.response?.data?.Error
  const code = err.response?.data?.code
  const message = err.response?.data?.message
  const details = err.response?.data?.details
  const status = err.response?.status
  switch (code) {
    case '23514':
      return getErrorDetails(message)
    case '42501':
      if (status === 401) userStore?.logout()
      break
    case 'P0001':
      return message
    case '23503':
      return details
  }

  if (msg === 'Invalid username or password') return 'Логин/пароль неверный'
  if (status === 409) return 'Элемент уже присутствует в списке'
  return msg ?? err.message
}

const getErrorDetails = (message: string): string => {
  const messagesMap: IMessageMap[] = [
    {
      incl: 'itemsratelimitlimit',
      title:
        'Ограничение на частоту отправки регистратором сообщений о выпуске изделий в миллисекундах (целое число > 250)'
    },
    {
      incl: 'dataintervallimit',
      title:
        'Интервал в миллисекундах, с которым регистратор должен публиковать сообщения (целое число > 250)'
    },
    {
      incl: 'shift_dinner_start_dinner_duration_check',
      title: 'Интервал перерыва на обед должен содержаться внутри интервала смены'
    },
    {
      incl: 'shift_start_check',
      title: 'Начало смены должно быть кратным 5 минутам'
    },
    {
      incl: 'shift_duration_check',
      title: 'Продолжительность смены должна быть кратной 5 минутам'
    }
  ]
  return messagesMap.find((messageMap) => message.includes(messageMap.incl))?.title ?? message
}
