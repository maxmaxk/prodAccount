import { type IPagintationData } from './types'

export class PaginationModel {
  limit: number
  offset: number
  countRecords: number
  selectPage: number
  refreshHandler: null | (() => Promise<void>)
  constructor(init: IPagintationData) {
    this.limit = init.limit
    this.offset = init.offset
    this.countRecords = init.countRecords
    this.selectPage = init.selectPage
    this.refreshHandler = null
  }
  setLimit(limit: number) {
    this.limit = limit
    this.setNumPage(1)
  }
  setOffset(offset: number) {
    this.offset = offset
  }
  setCountRecord(contentRange: string) {
    const p = contentRange.indexOf('/')
    if (p) this.countRecords = Number(contentRange.substring(p + 1))
  }
  setRefreshHandler(refreshHandler: () => Promise<void>) {
    this.refreshHandler = refreshHandler
  }
  setNumPage(num: number, refresh: boolean = true) {
    this.selectPage = num
    this.setOffset((num - 1) * this.limit)
    if (this.refreshHandler && refresh) this.refreshHandler()
  }
}
