import { reactive } from 'vue'
import { errorNotification } from '@/shared/notification'
import { errorAnswer } from '@/shared/errorAnswer/model'
import {
  getUsersRequest,
  deleteUsersRequest,
  insertUsersRequest,
  updateUsersRequest,
  type IUser
} from '@/shared/api/getUsers'
import type { IErrorAnswer } from '@/shared/errorAnswer/types'
import type { IUsersResponse, IUsersStore } from './types'
import { PaginationModel } from '@/shared/commonPagination/pagination'
import { EOperation } from '@/shared/commonTypes/filterTypes'
import { EDirSort, EEditType } from '@/shared/commonTypes/tableTypes'
import { titles, editFields, filters, options } from './consts'
import { getShiftsRequest } from '@/shared/api/getShifts'
import type { IShiftsResponse } from '../shifts/types'
import type { IOption } from '@/shared/commonTypes/optionTypes'
import { userStore } from '@/entities/user/store'

export const usersStore = reactive<IUsersStore>({
  selectRows: [],
  users: [],
  allUsers: [],
  editFields,
  paginationModel: new PaginationModel({ limit: 10, offset: 0, countRecords: 0, selectPage: 1 }),
  chechAllFlag: false,
  showEdit: false,
  filters,
  isLoading: false,
  shiftsOptions: [],
  async getUsers() {
    try {
      this.isLoading = true
      const usersResponse = (await getUsersRequest(
        this.paginationModel,
        this.orderBy,
        this.urlFilter
      )) as unknown as IUsersResponse
      this.isLoading = false
      this.paginationModel.setCountRecord(usersResponse.headers['content-range'] ?? '')
      this.users = usersResponse.data
      this.rows = this.users.map((user) => {
        const optionType = options.find((options: IOption<string>) => options.value === user.type)
        const titleType = optionType ? optionType.title : ''
        return {
          id: String(user.id),
          selectRow: true,
          username: { title: user.username, url: `user/${user.id}` },
          fullname: user.fullname,
          typeStr: titleType,
          userType: user.type,
          enabledStr: user.enabled ? 'Включен' : 'Выключен',
          editRow: true,
          editRegistrars: true,
          className: ''
        }
      })
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
    this.chechAllFlag = false
    if (this.clearSelect) this.clearSelect()
  },
  async getAllUsers() {
    try {
      this.isLoading = true
      const usersResponse = (await getUsersRequest(null, '', '')) as unknown as IUsersResponse
      this.isLoading = false
      this.allUsers = usersResponse.data
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  async deleteUsers() {
    if (!this.selectRows || this.selectRows.length === 0) return
    try {
      this.isLoading = true
      await Promise.all(this.selectRows.map((id) => deleteUsersRequest(id)))
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
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
  orderBy: 'username',
  setSort(orderBy: string): void {
    this.orderBy = orderBy
    this.paginationModel.setNumPage(1)
    this.getUsers()
  },
  urlFilter: '',
  async changeFilter(field: number, value: string) {
    let urlFilter = ''
    this.filters[field].value = value
    this.filters.forEach((data) => {
      if (data.value) {
        let filterValue = data.value
        if (data.operation === EOperation.Like) filterValue = `%25${filterValue}%25`
        if (data.fieldName) urlFilter += `&${data.fieldName}=${data.operation}.${filterValue}`
      }
    })
    await this.setFilter(urlFilter)
  },
  async setFilter(urlFilter: string) {
    this.urlFilter = urlFilter
    this.paginationModel.setNumPage(1)
    await this.getUsers()
  },
  setHandler() {
    this.paginationModel.setRefreshHandler(this.getUsers.bind(this))
  },
  async deleteRows() {
    await this.deleteUsers()
    this.getUsers()
  },
  selectEditRow: '',
  async editRow(rowId) {
    if (!this.editFields) return
    try {
      this.isLoading = true
      const usersResponse = (await getUsersRequest(
        null,
        'id',
        `&id=eq.${rowId}`
      )) as unknown as IUsersResponse
      this.isLoading = false
      if (usersResponse.data.length) {
        this.editFields.forEach((field) => {
          if (field.type === EEditType.Number) {
            field.value = 0
          }
        })
        Object.entries(usersResponse.data[0]).forEach((entry) => {
          const [key, value] = entry
          if (key !== 'id') {
            const field = this.editFields?.find((editField) => editField.field === key)
            if (field)
              if (field.type === EEditType.Checkbox) field.value = value
              else field.value = value !== null ? String(value) : ''
          }
        })
        const fieldNewpassRepeat = this.editFields?.find(
          (editField) => editField.field === 'newpass_repeat'
        )
        if (fieldNewpassRepeat) fieldNewpassRepeat.value = ''
        this.showEdit = true
        this.selectEditRow = rowId
      }
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  async insertUser(rowData) {
    try {
      this.isLoading = true
      ;(await insertUsersRequest(rowData)) as unknown as IUsersResponse
      this.isLoading = false
      return true
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
      return false
    }
  },
  async saveUser() {
    if (!this.editFields) return
    let rowData: Partial<IUser> = {}
    let required: boolean = false

    const fieldNewpass = this.editFields?.find((editField) => editField.field === 'password')
    const fieldNewpassRepeat = this.editFields?.find(
      (editField) => editField.field === 'newpass_repeat'
    )
    if (fieldNewpass && fieldNewpassRepeat)
      if (fieldNewpass.value != fieldNewpassRepeat.value) {
        const err = { message: 'Неверно введен повторный пароль' }
        errorNotification(errorAnswer(err as IErrorAnswer, userStore))
        return
      }

    this.editFields.forEach((field) => {
      if (field.field && !field.notSave!) {
        const key = field.field as keyof IUser
        required =
          required ||
          (field.required && field.value === '') ||
          field.value < field.minValue! ||
          field.value > field.maxValue!

        if (!field.value && field.null!) rowData = { ...rowData, [key]: null }
        else
          rowData = {
            ...rowData,
            [key]: field.type === EEditType.Number ? parseInt(field.value) : field.value
          }
      }
    })
    if (required) return
    let result
    if (this.selectEditRow) result = await this.updateUser(rowData as IUser)
    else result = await this.insertUser(rowData as IUser)
    if (result) {
      this.showEdit = false
      this.getUsers()
    }
  },
  async updateUser(rowData) {
    if (!this.selectEditRow) return
    try {
      this.isLoading = true
      rowData.id = parseInt(this.selectEditRow)
      await updateUsersRequest(rowData)
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
      if (edit.valueDefault) edit.value = edit.valueDefault
      else edit.value = ''
    })
  },
  workshopFilter: 0,
  showEditRegistrars: false,
  setAllShifts(shifts) {
    this.shiftsOptions = shifts.map((shift) => {
      return {
        value: String(shift.id),
        title: shift.title
      }
    })
    this.shiftsOptions.unshift({
      title: 'Смена не выбрана',
      value: ''
    })
    if (this.setOptionsByEditName) this.setOptionsByEditName('shiftid', this.shiftsOptions)
  },
  setOptionsByEditName(fieldName, options) {
    if (!this.editFields) return
    const index = this.editFields.findIndex((field) => field.field === fieldName)
    if (index !== -1) this.editFields[index].options = options
  },
  editUserRegistrars(rowId) {
    this.selectEditRow = rowId
    this.showEditRegistrars = true
  },
  checkDepend(edit) {
    if (!edit.dependOn) return true
    const [field, value] = edit.dependOn.split('=')
    const userType = this.editFields?.find((editField) => editField.field === field)
    if (userType) {
      return userType.value === value
    }
    return false
  },
  getHumanUserType(userType) {
    const findUserType = options.find((option) => option.value === userType)
    if (!findUserType) {
      throw Error('User type not found')
    }
    return findUserType.title
  }
})
