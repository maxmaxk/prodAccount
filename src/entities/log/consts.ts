import { EFilterType, EOperation } from '@/shared/commonTypes/filterTypes'
import { EEventType } from './types'
import { EDirSort, ETypeColumn } from '@/shared/commonTypes/tableTypes'

const options = [
  {
    title: 'Все типы',
    value: ''
  }
].concat(
  Object.keys(EEventType).map((eventType) => ({
    title: eventType,
    value: eventType
  }))
)

export const filters = [
  {
    name: 'dateFrom',
    placeHolder: 'Дата/Время от',
    type: EFilterType.DateTime,
    width: '20%',
    value: '',
    operation: EOperation.Gte,
    fieldName: 'timestamp'
  },
  {
    name: 'dateTo',
    placeHolder: 'Дата/Время до',
    type: EFilterType.DateTime,
    width: '20%',
    value: '',
    operation: EOperation.Lte,
    fieldName: 'timestamp'
  },
  {
    name: 'typeMessage',
    placeHolder: 'Тип сообщения',
    type: EFilterType.Select,
    width: '20%',
    value: '',
    operation: EOperation.Eq,
    fieldName: 'eventtype',
    options
  },
  {
    name: 'registrars',
    placeHolder: 'Регистратор',
    type: EFilterType.Select,
    width: '20%',
    value: '',
    operation: EOperation.Eq,
    fieldName: 'regid',
    options: []
  },
  {
    name: 'users',
    placeHolder: 'Пользователи',
    type: EFilterType.Select,
    width: '20%',
    value: '',
    operation: EOperation.Eq,
    fieldName: 'login_user_id',
    options: []
  }
]

export const titles = [
  {
    typeColumn: ETypeColumn.Data,
    title: 'Время',
    width: '20%',
    sort: {
      hasSort: true,
      dir: EDirSort.Dec,
      fieldsOrder: { inc: 'timestamp', dec: 'timestamp.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Тип',
    width: '20%',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: {
        inc: 'eventtype',
        dec: 'eventtype.desc'
      }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Сообщение',
    width: '60%',
    sort: { hasSort: false, dir: EDirSort.Na }
  }
]
