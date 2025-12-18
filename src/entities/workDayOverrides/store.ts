import { reactive } from 'vue'
import { errorNotification } from '@/shared/notification'
import { errorAnswer } from '@/shared/errorAnswer/model'
import {
  getWorkDayOverridesRequest,
  deleteWorkDayOverridesRequest,
  insertWorkDayOverridesRequest,
  updateWorkDayOverridesRequest
} from '@/shared/api/getWorkDayOverrides'
import type { IErrorAnswer } from '@/shared/errorAnswer/types'
import type { IWorkDayOverridesResponse, IWorkDayOverridesStore } from './types'
import { EDirSort, EEditType, ETypeColumn } from '@/shared/commonTypes/tableTypes'
import { userStore } from '@/entities/user/store'

export const workDayOverridesStore = reactive<IWorkDayOverridesStore>({
  selectRows: [],
  workDayOverrides: [],
  shiftId: '',
  editFields: [
    {
      title: 'Дата',
      field: 'date',
      type: EEditType.Date,
      value: '',
      readonly: false,
      required: true
    }
  ],
  chechAllFlag: false,
  showEdit: false,
  isLoading: false,
  async getWorkDayOverrides() {
    try {
      this.isLoading = true
      const workDayOverridesResponse = (await getWorkDayOverridesRequest(
        null,
        this.shiftId,
        this.orderBy
      )) as unknown as IWorkDayOverridesResponse
      this.isLoading = false
      this.workDayOverrides = workDayOverridesResponse.data
      this.rows = this.workDayOverrides.map((workDay) => ({
        id: String(workDay.id),
        selectRow: true,
        date: workDay.date,
        editRow: true,
        className: ''
      }))
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
    this.chechAllFlag = false
    if (this.clearSelect) this.clearSelect()
  },
  async deleteWorkDayOverrides() {
    if (!this.getIdsSelectRows) return
    try {
      this.isLoading = true
      await deleteWorkDayOverridesRequest(this.getIdsSelectRows())
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
      title: 'Дата',
      width: 'calc(100%-68px)',
      sort: {
        hasSort: true,
        dir: EDirSort.Inc,
        fieldsOrder: { inc: 'date', dec: 'date.desc' }
      }
    },
    {
      typeColumn: ETypeColumn.EditRow,
      title: '',
      width: '34px',
      sort: {
        hasSort: false
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
  orderBy: 'date',
  setSort(orderBy: string): void {
    this.orderBy = orderBy
    this.getWorkDayOverrides()
  },
  async deleteRows() {
    await this.deleteWorkDayOverrides()
    this.getWorkDayOverrides()
  },
  selectEditRow: '',
  async editRow(rowId) {
    if (!this.editFields) return
    try {
      this.isLoading = true
      const workDayOverridesResponse = (await getWorkDayOverridesRequest(
        rowId,
        null,
        null
      )) as unknown as IWorkDayOverridesResponse
      this.isLoading = false
      if (workDayOverridesResponse.data.length) {
        Object.entries(workDayOverridesResponse.data[0]).forEach((entry) => {
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
  async insertWorkDayOverrides(rowData) {
    try {
      this.isLoading = true
      ;(await insertWorkDayOverridesRequest(rowData)) as unknown as IWorkDayOverridesResponse
      this.isLoading = false
      return true
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
      return false
    }
  },
  async updateWorkDayOverrides(rowData) {
    if (!this.selectEditRow) return
    try {
      this.isLoading = true
      await updateWorkDayOverridesRequest(this.selectEditRow, rowData)
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
