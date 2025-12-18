export interface IRegistrar {
  randomid: number
  description: string
  enabled?: boolean
  itemsscheduled?: number
  displayonperformancescreen?: boolean
  workshopid?: number
  machinetypeid?: number
  datainterval?: number
  itemsratelimit?: number
  autologinuserid?: number | null
  enabledStr: string
  workshops?: null | IWorkShopTitle
  machine_types?: null | IMachineTypeTitle
}

interface IWorkShopTitle {
  title: string
}

interface IMachineTypeTitle {
  title: string
}
