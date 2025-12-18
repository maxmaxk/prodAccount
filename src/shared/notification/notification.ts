import { notify } from '@kyvg/vue3-notification'

export const errorNotification = (errorText: string): void => {
  notify({
    type: 'error',
    title: 'Ошибка:',
    text: errorText
  })
}

export const successNotification = (successText: string): void => {
  notify({
    type: 'success',
    text: successText
  })
}
