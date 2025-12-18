<script setup lang="ts">
import { ETagType } from '@/features/caption/types'
import CaptionControl from '@/features/caption/caption.vue'
import FilterControl from '@/widgets/filterControl/filterControl.vue'
import TableControl from '@/widgets/tableControl/tableControl.vue'
import Pagination from '@/widgets/pagination/pagination.vue'
import { itemsStore } from '@/entities/items/store'

itemsStore.getItems()
itemsStore.setHandler()
</script>

<template>
  <CaptionControl title="Изделия" :tagType="ETagType.H1" />
  <FilterControl :filterStore="itemsStore"></FilterControl>
  <TableControl class="itemsTable" :tableStore="itemsStore" :font-size="10"></TableControl>
  <Pagination class="shiftsPaginator" :paginationModel="itemsStore.paginationModel" />
</template>

<style scoped>
.itemsTable {
  margin: 5px 20px 20px 20px;
  overflow-x: auto;
}

.shiftsPaginator {
  padding: 0px 20px 10px 20px;
  flex-grow: 1;
  align-content: flex-end;
}
</style>
