import { maxReloadTime } from './consts'

export const checkLogoutOnMount = (): boolean => {
  const lastVisit = parseInt(localStorage.getItem('lastVisit') ?? '0')
  const now = new Date().getTime()
  const newLoad = now - lastVisit > 2 * maxReloadTime || lastVisit > now
  const remember = localStorage.getItem('remember') === ''
  setInterval(() => {
    const now = new Date().getTime()
    localStorage.setItem('lastVisit', now.toString())
  }, maxReloadTime)
  return newLoad && !remember
}
