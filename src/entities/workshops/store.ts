import { reactive } from 'vue'
import { errorNotification } from '@/shared/notification'
import { errorAnswer } from '@/shared/errorAnswer/model'
import {
  getWorkshopsRequest,
  deleteWorkshopsRequest,
  insertWorkshopsRequest,
  updateWorkshopsRequest
} from '@/shared/api/getWorkshops'
import type { IErrorAnswer } from '@/shared/errorAnswer/types'
import type { IWorkshopsResponse, IWorkshopsStore } from './types'
import { PaginationModel } from '@/shared/commonPagination/pagination'
import { EFilterType, EOperation } from '@/shared/commonTypes/filterTypes'
import { EDirSort, EEditType, ETypeColumn } from '@/shared/commonTypes/tableTypes'
import { userStore } from '@/entities/user/store'

export const workshopsStore = reactive<IWorkshopsStore>({
  selectRows: [],
  workshops: [],
  editFields: [
    {
      title: 'Название',
      field: 'title',
      type: EEditType.Text,
      value: '',
      readonly: false,
      required: true
    }
  ],
  paginationModel: new PaginationModel({ limit: 10, offset: 0, countRecords: 0, selectPage: 1 }),
  chechAllFlag: false,
  showEdit: false,
  filters: [
    {
      name: 'name',
      placeHolder: 'Название',
      type: EFilterType.Text,
      width: '100%',
      value: '',
      operation: EOperation.Like,
      fieldName: 'title'
    }
  ],
  workshopsFilterOptions: [],
  isLoading: false,
  async getWorkshops() {
    try {
      this.isLoading = true
      const workshopsResponse = (await getWorkshopsRequest(
        this.paginationModel,
        this.orderBy,
        this.urlFilter
      )) as unknown as IWorkshopsResponse
      this.isLoading = false
      this.paginationModel.setCountRecord(workshopsResponse.headers['content-range'] ?? '')
      this.workshops = workshopsResponse.data
      this.workshopsFilterOptions = this.workshops.map((workshop) => ({
        title: workshop.title,
        value: workshop.id ?? 0
      }))
      this.rows = this.workshops.map((workshop) => ({
        id: String(workshop.id),
        selectRow: true,
        title: workshop.title,
        editRow: true,
        className: ''
      }))
      this.workshopsFilterOptions.unshift({ title: 'Все цехи', value: -1 })
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
    this.chechAllFlag = false
    if (this.clearSelect) this.clearSelect()
  },
  async getAllWorkshops() {
    try {
      this.isLoading = true
      const workshopsResponse = (await getWorkshopsRequest(
        null,
        '',
        ''
      )) as unknown as IWorkshopsResponse
      this.isLoading = false
      this.workshopsFilterOptions = workshopsResponse.data.map((workshop) => ({
        title: workshop.title,
        value: workshop.id ?? 0
      }))
      this.workshopsFilterOptions.unshift({ title: 'Все цехи', value: -1 })
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
    this.chechAllFlag = false
  },
  async deleteWorkshops() {
    if (!this.getIdsSelectRows) return
    try {
      this.isLoading = true
      await deleteWorkshopsRequest(this.getIdsSelectRows())
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  titles: [
    {
      typeColumn: ETypeColumn.SelectRow,
      title: '',
      width: '34px',
      sort: {
        hasSort: false,
        dir: EDirSort.Na
      }
    },
    {
      typeColumn: ETypeColumn.Data,
      title: 'Название',
      width: 'calc(100%-68px)',
      sort: {
        hasSort: true,
        dir: EDirSort.Inc,
        fieldsOrder: { inc: 'title', dec: 'title.desc' }
      }
    },
    {
      typeColumn: ETypeColumn.EditRow,
      title: '',
      width: '34px',
      sort: {
        hasSort: false,
        dir: EDirSort.Na
      }
    }
  ],
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
  orderBy: 'title',
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
        if (data.fieldName) urlFilter += `&${data.fieldName}=${data.operation}.${filterValue}`
      }
    })
    this.setFilter(urlFilter)
  },
  async setFilter(urlFilter) {
    this.urlFilter = urlFilter
    this.paginationModel.setNumPage(1)
  },
  setHandler() {
    this.paginationModel.setRefreshHandler(this.getWorkshops.bind(this))
  },
  async deleteRows() {
    await this.deleteWorkshops()
    this.getWorkshops()
  },
  selectEditRow: '',
  async editRow(rowId) {
    if (!this.editFields) return
    try {
      this.isLoading = true
      const workshopsResponse = (await getWorkshopsRequest(
        null,
        'id',
        `&id=eq.${rowId}`
      )) as unknown as IWorkshopsResponse
      this.isLoading = false
      if (workshopsResponse.data.length) {
        Object.entries(workshopsResponse.data[0]).forEach((entry) => {
          const [key, value] = entry
          if (key !== 'id') {
            const index = this.editFields!.findIndex((field) => field.field === key)
            if (index !== -1) this.editFields![index].value = value
          }
        })
        this.showEdit = true
        this.selectEditRow = rowId
      }
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  async insertWorkshop(rowData) {
    try {
      this.isLoading = true
      ;(await insertWorkshopsRequest(rowData)) as unknown as IWorkshopsResponse
      this.isLoading = false
      return true
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
      return false
    }
  },
  async updateWorkshop(rowData) {
    if (!this.selectEditRow) return
    try {
      this.isLoading = true
      await updateWorkshopsRequest(this.selectEditRow, rowData)
      this.isLoading = false
      return true
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
      return false
    }
  },
  selectRow(rowId) {
    if (!this.selectRows) return
    const index = this.selectRows.indexOf(rowId)
    if (index == -1) this.selectRows.push(rowId)
    else this.selectRows.splice(index, 1)
  },
  getSelected(rowId): boolean {
    return this.selectRows?.includes(rowId) ?? false
  },
  clearSelect(): void {
    this.selectRows = []
  },
  selectAll(): void {
    this.selectRows = this.rows.map((row) => row.id)
  },
  setCheckAll() {
    this.chechAllFlag = !this.chechAllFlag
    if (this.chechAllFlag) {
      if (this.selectAll) this.selectAll()
    } else {
      if (this.clearSelect) this.clearSelect()
    }
  },
  getIdsSelectRows(): string {
    return this.selectRows?.join(',') ?? ''
  },
  clearEditFields() {
    if (!this.editFields) return
    this.editFields.forEach((edit) => {
      edit.value = ''
    })
  }
})
