import { reactive } from 'vue'
import { errorNotification } from '@/shared/notification'
import { errorAnswer } from '@/shared/errorAnswer/model'
import type { IErrorAnswer } from '@/shared/errorAnswer/types'
import type { IItemsStore } from './types'
import { PaginationModel } from '@/shared/commonPagination/pagination'
import { EOperation } from '@/shared/commonTypes/filterTypes'
import { EDirSort } from '@/shared/commonTypes/tableTypes'
import { titles, filters } from './consts'
import { userStore } from '@/entities/user/store'
import { getItemsRequest } from '@/shared/api/getItem/getItems'
import type { IItemsResponse } from '@/shared/api/getItem/types'
import moment from 'moment'

export const itemsStore = reactive<IItemsStore>({
  showEditTitles: true,
  items: [],
  paginationModel: new PaginationModel({ limit: 10, offset: 0, countRecords: 0, selectPage: 1 }),
  chechAllFlag: false,
  showEdit: false,
  filters,
  itemsFilterOptions: [],
  isLoading: false,
  async getItems() {
    try {
      this.isLoading = true
      const itemsResponse = (await getItemsRequest(
        this.paginationModel,
        this.orderBy,
        this.urlFilter
      )) as unknown as IItemsResponse
      this.isLoading = false
      this.paginationModel.setCountRecord(itemsResponse.headers['content-range'] ?? '')
      this.items = itemsResponse.data
      this.rows = this.items.map((item) => ({
        id: String(item.id),
        _id: item.id,
        code: item.code,
        displayname: item.displayname,
        shiftplan: item.shiftplan,
        tup: item.tup,
        tdown: item.tdown,
        pressure: item.pressure,
        tcooking: item.tcooking,
        usagerate: item.usagerate,
        weight: item.weight,
        bagging: item.bagging,
        ts: moment(item.ts).format('DD.MM.YYYY HH:mm:ss'),
        item_places: item.item_places,
        errors: item.errors,
        className: ''
      }))
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
    this.chechAllFlag = false
    if (this.clearSelect) this.clearSelect()
  },
  titles,
  rows: [],
  changeSort(field: number): void {
    let orderBy = null
    this.titles.forEach((data, index) => {
      if (index === field) {
        if (data.sort.dir === EDirSort.Na || data.sort.dir === EDirSort.Inc) {
          data.sort.dir = EDirSort.Dec
        } else {
          data.sort.dir = EDirSort.Inc
        }
        orderBy = data.sort.fieldsOrder ? data.sort.fieldsOrder[data.sort.dir] : null
      } else {
        data.sort.dir = EDirSort.Na
      }
    })
    if (orderBy) this.setSort(orderBy)
  },
  orderBy: 'id',
  setSort(orderBy: string): void {
    this.orderBy = orderBy
    this.paginationModel.setNumPage(1)
  },
  urlFilter: '',
  async changeFilter(field, value) {
    let urlFilter = ''
    this.filters[field].value = value
    this.filters.forEach((data) => {
      if (data.value) {
        let filterValue = data.value
        if (data.operation === EOperation.Like) filterValue = `%25${filterValue}%25`
        if (data.fieldName === 'start' || data.fieldName === 'end') {
          const v = 60 * parseInt(filterValue)
          urlFilter += `&${data.fieldName}=${EOperation.Gte}.${v}&${data.fieldName}=${
            EOperation.Lt
          }.${v + 60}`
        } else if (data.fieldName)
          urlFilter += `&${data.fieldName}=${data.operation}.${filterValue}`
      }
    })
    await this.setFilter(urlFilter)
  },
  async setFilter(urlFilter) {
    this.urlFilter = urlFilter
    this.paginationModel.setNumPage(1)
  },
  setHandler() {
    this.paginationModel.setRefreshHandler(this.getItems.bind(this))
  }
})
