import { ETypeUser } from '@/shared/api/getUsers'
import { EFilterType, EOperation } from '@/shared/commonTypes/filterTypes'
import type { IOption } from '@/shared/commonTypes/optionTypes'
import { EDirSort, EEditType, ETypeColumn, type ITitle } from '@/shared/commonTypes/tableTypes'

export const titles: ITitle[] = [
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
    title: 'Имя пользователя',
    width: 'calc(100%-68px)',
    sort: {
      hasSort: true,
      dir: EDirSort.Inc,
      fieldsOrder: { inc: 'username', dec: 'username.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Полное имя',
    width: 'calc(100%-68px)',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'fullname', dec: 'fullname.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Тип',
    width: 'calc(100%-68px)',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'type', dec: 'type.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Статус',
    width: 'calc(100%-68px)',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'enabled', dec: 'enabled.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.EditRow,
    title: '',
    width: '34px',
    sort: {
      hasSort: false
    }
  },
  {
    typeColumn: ETypeColumn.EditRegistrars,
    title: '',
    width: '34px',
    sort: {
      hasSort: false
    }
  }
]

export const options: IOption<string>[] = [
  { value: '', title: 'Все типы' },
  { value: ETypeUser.Administrator, title: 'Администратор' },
  { value: ETypeUser.ServiceEngineer, title: 'Сервисный инженер' },
  { value: ETypeUser.ShiftManager, title: 'Начальник смены' },
  { value: ETypeUser.User, title: 'Оператор станка' },
  { value: ETypeUser.ROAdmin, title: 'Полный доступ только на чтение' },
  { value: ETypeUser.ServiceEngineerHub, title: 'Общий аккаунт сервисных инженеров' },
  { value: ETypeUser.Designer, title: 'Разработчик' }
]

export const editFields = [
  {
    title: 'Логин',
    field: 'username',
    type: EEditType.Text,
    value: '',
    readonly: false,
    required: true
  },
  {
    title: 'Полное имя',
    field: 'fullname',
    type: EEditType.Text,
    value: '',
    readonly: false,
    required: true
  },
  {
    title: 'Смена',
    field: 'shiftid',
    type: EEditType.Select,
    value: '',
    null: true,
    options: []
  },
  {
    title: 'Тип',
    field: 'type',
    type: EEditType.Select,
    value: '',
    required: true,
    options
  },
  {
    title: 'RFID',
    field: 'rfid',
    type: EEditType.Number,
    value: ''
  },
  {
    title: 'Статус',
    field: 'enabled',
    type: EEditType.Select,
    value: '',
    valueDefault: 'true',
    options: [
      { value: 'true', title: 'Включен' },
      { value: 'false', title: 'Выключен' }
    ]
  },
  {
    title: 'Пароль',
    field: 'password',
    type: EEditType.Password,
    value: ''
  },
  {
    title: 'Подтверждение пароля',
    field: 'newpass_repeat',
    type: EEditType.Password,
    notSave: true,
    value: ''
  },
  {
    title: 'Электронная почта',
    field: 'email',
    type: EEditType.Text,
    value: ''
  },
  {
    title: 'Телефон',
    field: 'phone',
    type: EEditType.Text,
    value: ''
  },
  {
    id: 'cb_servicesend',
    title: 'Разрешение отправки вызова по почте',
    field: 'servicesend',
    type: EEditType.Checkbox,
    value: '',
    dependOn: 'type=Service Engineer',
    valueDefault: true
  }
]

export const filters = [
  {
    name: 'username',
    placeHolder: 'Имя пользователя',
    type: EFilterType.Text,
    width: '20%',
    value: '',
    operation: EOperation.Like,
    fieldName: 'username'
  },
  {
    name: 'fullname',
    placeHolder: 'Полное имя',
    type: EFilterType.Text,
    width: '20%',
    operation: EOperation.Like,
    fieldName: 'fullname'
  },
  {
    name: 'rfid',
    placeHolder: 'RFID',
    type: EFilterType.Number,
    width: '20%',
    operation: EOperation.Eq,
    fieldName: 'rfid'
  },
  {
    name: 'type',
    placeHolder: 'Тип',
    type: EFilterType.Select,
    width: '20%',
    operation: EOperation.Eq,
    fieldName: 'type',
    value: '',
    options
  },
  {
    name: 'enabled',
    placeHolder: 'Статус',
    type: EFilterType.Select,
    width: '20%',
    value: '',
    operation: EOperation.Eq,
    fieldName: 'enabled',
    options: [
      { value: '', title: 'Статус' },
      { value: 'true', title: 'Включен' },
      { value: 'false', title: 'Выключен' }
    ]
  }
]
