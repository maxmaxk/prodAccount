import { reactive } from 'vue'
import {
  type ILogType,
  type ILogResponse,
  type ILogStore,
  type IRowType,
  EEventType
} from './types'
import { errorNotification } from '@/shared/notification'
import { errorAnswer, type IErrorAnswer } from '@/shared/errorAnswer'
import { getLogRequest } from '@/shared/api/getLog'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { EDirSort } from '@/shared/commonTypes/tableTypes'
import { PaginationModel } from '@/shared/commonPagination/pagination'
import { filters, titles } from './consts'
import { userStore } from '@/entities/user/store'

const logType: ILogType = {
  Message: { name: 'Сообщение', className: 'blackClass' },
  Notification: { name: 'Уведомление', className: 'notification' },
  Warning: { name: 'Предупреждение', className: 'warning' },
  Error: { name: 'Ошибка', className: 'error' }
}

export const logStore = reactive<ILogStore>({
  rows: [],
  isLoading: false,
  orderBy: 'timestamp.desc',
  paginationModel: new PaginationModel({ limit: 10, offset: 0, countRecords: 0, selectPage: 1 }),
  registrarsOptions: [],
  usersOptions: [],
  urlFilter: '',
  filters,
  titles,
  setOptionsByName(name, options) {
    const index = this.filters.findIndex((filter) => filter.name === name)
    if (index !== -1) this.filters[index].options = options
  },
  async changeFilter(field, value) {
    let urlFilter = ''
    this.filters[field].value = value
    this.filters.forEach((data) => {
      if (data.value && data.fieldName)
        urlFilter += `&${data.fieldName}=${data.operation}.${data.value}`
    })
    this.setFilter(urlFilter)
  },
  async setFilter(urlFilter) {
    this.urlFilter = urlFilter
    this.paginationModel.setNumPage(1)
  },
  changeSort(field) {
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
  setSort(orderBy) {
    this.orderBy = orderBy
    this.paginationModel.setNumPage(1)
  },
  // prettier-ignore
  getMessage(item) {
    if (item.eventtype === EEventType.AutoLoginSuccess) return `Пользователь ${item.login_username_server} удачно автоматически авторизовался в регистратор ${item.reg_description}`
    if (item.eventtype === EEventType.AutoLoginFail) return `Неудачная попытка автоматической авторизации пользователя с логином ${item.login_username_server} в регистратор ${item.reg_description}`
    if (item.eventtype === EEventType.LogoutSuccess) return `Пользователь ${item.login_username_server} удачно завершил сеанс на регистраторе ${item.reg_description}`
    if (item.eventtype === EEventType.LogoutFail) return `Неудачная попытка завершения сеанса пользователя с логином ${item.login_username_server} на регистраторе ${item.reg_description}`
    if (item.eventtype === EEventType.LoginPasswordSuccess || item.eventtype === EEventType.AuthPasswordSuccess) return `Пользователь ${item.login_username_server} удачно авторизовался в регистратор ${item.reg_description}`
    if (item.eventtype === EEventType.LoginPasswordFail || item.eventtype === EEventType.AuthPasswordFail) return `Неудачная попытка авторизации пользователя с логином ${item.login_username_server} в регистратор ${item.reg_description}`
    if (item.eventtype === EEventType.LoginRfidSuccess || item.eventtype === EEventType.AuthRfidSuccess) return `Пользователь ${item.login_username_server} с картой rfid ${item.login_rfid} удачно авторизовался в регистратор ${item.reg_description}`
    if (item.eventtype === EEventType.LoginRfidFail || item.eventtype === EEventType.AuthRfidFail) return `Неудачная попытка авторизации пользователя с картой rfid ${item.login_rfid} в регистратор ${item.reg_description}`
    if (item.eventtype === EEventType.AuthWebSuccess || item.eventtype === EEventType.LoginWebSuccess) return `Пользователь ${item.login_username_server} удачно авторизовался в системе мониторинга`
    if (item.eventtype === EEventType.AuthWebFail || item.eventtype === EEventType.LoginWebFail) return `Неудачная попытка авторизации пользователя с логином ${item.login_username_server} в системе мониторинга`
    if (item.eventtype === EEventType.LogoutWebSuccess) return `Пользователь ${item.login_username_server} удачно завершил сеанс в системе мониторинга`
    if (item.eventtype === EEventType.LogoutWebFail) return `Неудачная попытка завершения сеанса пользователя с логином ${item.login_username_server} в системе мониторинга`
    if (item.eventtype === EEventType.DeviceOnline) return `Регистратор ${item.reg_description} подключился к серверу`
    if (item.eventtype === EEventType.DeviceOffline) return `Регистратор ${item.reg_description} отключился от сервера`
    return 'Событие неопознано'
  },
  getMessageType(item): IRowType {
    if (
      item.eventtype === EEventType.AuthPasswordSuccess ||
      item.eventtype === EEventType.AuthRfidSuccess ||
      item.eventtype === EEventType.AuthWebSuccess ||
      item.eventtype === EEventType.AutoLoginSuccess ||
      item.eventtype === EEventType.LoginPasswordSuccess ||
      item.eventtype === EEventType.LoginRfidSuccess ||
      item.eventtype === EEventType.LoginWebSuccess ||
      item.eventtype === EEventType.LogoutSuccess ||
      item.eventtype === EEventType.DeviceOnline
    )
      return logType['Message']
    return logType['Warning']
  },
  async getLog() {
    try {
      this.isLoading = true
      const logResponse = (await getLogRequest(
        this.paginationModel,
        this.orderBy,
        this.urlFilter
      )) as unknown as ILogResponse
      this.isLoading = false
      this.paginationModel.setCountRecord(logResponse.headers['content-range'] ?? '')
      this.rows = logResponse.data.map((log) => {
        const typeMsg = this.getMessageType(log)
        return {
          id: uuidv4(),
          className: typeMsg.className,
          timestamp: moment(log.timestamp).format('DD.MM.YYYY, HH:mm:ss'),
          type: log.eventtype,
          message: this.getMessage(log)
        }
      })
    } catch (err) {
      this.isLoading = false
      errorNotification(errorAnswer(err as IErrorAnswer, userStore))
    }
  },
  async setAllRegistrars(registrars) {
    this.registrarsOptions = registrars.map((registrar) => {
      return {
        value: String(registrar.randomid),
        title: registrar.description
      }
    })
    this.registrarsOptions.unshift({
      title: 'Все регистраторы',
      value: ''
    })
    if (this.setOptionsByName) this.setOptionsByName('registrars', this.registrarsOptions)
  },
  async setAllUsers(users) {
    this.usersOptions = users.map((user) => {
      return {
        value: String(user.id),
        title: user.username
      }
    })
    this.usersOptions.unshift({
      title: 'Все пользователи',
      value: ''
    })
    if (this.setOptionsByName) this.setOptionsByName('users', this.usersOptions)
  },
  setHandler() {
    this.paginationModel.setRefreshHandler(this.getLog.bind(this))
  }
})
