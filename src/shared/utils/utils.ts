export const getStrOnTime = (onTime: number): string => {
  if (onTime === 0) return ''
  const days = Math.trunc(onTime / (24 * 60 * 60))
  const hours = Math.trunc((onTime % (24 * 60 * 60)) / (60 * 60))
  const mins = Math.trunc((onTime % (60 * 60)) / 60)
  if (days === 0 && hours === 0 && mins === 0) return '( < 1 мин )'
  return `( ${days > 0 ? `${days} дн ` : ''}${hours > 0 ? `${hours} час ` : ''}${
    mins > 0 ? `${mins} мин ` : ''
  })`
}
