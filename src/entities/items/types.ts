import type { IItem } from '@/shared/api/getItem/types'
import type { PaginationModel } from '@/shared/commonPagination/pagination'
import type { IFilterStore } from '@/shared/commonTypes/filterTypes'
import type { IOption } from '@/shared/commonTypes/optionTypes'
import type { ISortStore, ITableStore } from '@/shared/commonTypes/tableTypes'

export interface IItemsStore extends ITableStore, ISortStore, IFilterStore {
  paginationModel: PaginationModel
  items: IItem[]
  itemsFilterOptions: IOption<number>[]
  isLoading: boolean
  getItems: () => Promise<void>
  setHandler: () => void
}
