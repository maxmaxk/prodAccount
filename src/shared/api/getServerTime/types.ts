export interface IRegistrar {
  randomid: number
  description: string
  enabled: boolean
  itemsscheduled: number
  displayonperformancescreen: boolean
  workshopid: number
  machinetypeid: number
  datainterval: number
  itemsratelimit: number
  autologinuserid: number | null
}
