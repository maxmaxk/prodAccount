import { EFilterType, EOperation } from '@/shared/commonTypes/filterTypes'
import { EDirSort, ETypeColumn, type ITitle } from '@/shared/commonTypes/tableTypes'

export const titles: ITitle[] = [
  {
    typeColumn: ETypeColumn.Data,
    title: 'id',
    width: '34px',
    sort: {
      hasSort: true,
      dir: EDirSort.Inc,
      fieldsOrder: { inc: 'id', dec: 'id.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Код',
    width: '70px',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'code', dec: 'code.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Наименование',
    width: 'calc(100%-150px)',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'displayname', dec: 'displayname.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Норма смены',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 't вверх',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 't вниз',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Давл.',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Время варки',
    width: '50px',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'tcooking', dec: 'tcooking.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Норма расхода силикон, г',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Вес изделия, г',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Закладка',
    width: '50px',
    sort: {
      hasSort: false,
      dir: EDirSort.Na
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Время синхронизации',
    width: '120px',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'ts', dec: 'ts.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Мест',
    width: '50px',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'item_places', dec: 'item_places.desc' }
    }
  },
  {
    typeColumn: ETypeColumn.Data,
    title: 'Ошибки',
    width: '300px',
    sort: {
      hasSort: true,
      dir: EDirSort.Na,
      fieldsOrder: { inc: 'errors', dec: 'errors.desc' }
    }
  }
]

export const filters = [
  {
    name: 'id',
    placeHolder: 'id',
    type: EFilterType.Text,
    width: '25%',
    value: '',
    operation: EOperation.Eq,
    fieldName: 'id'
  },
  {
    name: 'code',
    placeHolder: 'Код',
    type: EFilterType.Text,
    width: '25%',
    operation: EOperation.Like,
    fieldName: 'code'
  },
  {
    name: 'displayname',
    placeHolder: 'Наименование',
    type: EFilterType.Text,
    width: '25%',
    operation: EOperation.Like,
    fieldName: 'displayname'
  },
  {
    name: 'errors',
    placeHolder: 'Ошибки',
    type: EFilterType.Text,
    width: '25%',
    operation: EOperation.Like,
    fieldName: 'errors'
  }
]
