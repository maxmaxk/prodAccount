<script setup lang="ts">
import { logStore } from '@/entities/log/store'
import CaptionControl from '@/features/caption/caption.vue'
import { ETagType } from '@/features/caption/types'
import TableControl from '@/widgets/tableControl/tableControl.vue'
import Pagination from '@/widgets/pagination/pagination.vue'
import FilterControl from '@/widgets/filterControl/filterControl.vue'
import { registrarsStore } from '@/entities/registrars/store'
import { usersStore } from '@/entities/users/store'

const init = async () => {
  await registrarsStore.getAllRegistrars()
  logStore.setAllRegistrars(registrarsStore.allRegistrars)
  await usersStore.getAllUsers()
  logStore.setAllUsers(usersStore.allUsers)
}

init()
logStore.getLog()
logStore.setHandler()
</script>

<template>
  <CaptionControl title="Журнал событий" :tagType="ETagType.H1" />
  <FilterControl :filterStore="logStore"></FilterControl>
  <TableControl class="logTable" :tableStore="logStore"> </TableControl>
  <Pagination class="logPaginator" :paginationModel="logStore.paginationModel" />
</template>

<style scoped>
.logTable {
  margin: 5px 20px 20px 20px;
}
.logPaginator {
  padding: 0px 20px 10px 20px;
  flex-grow: 1;
  align-content: flex-end;
}
</style>
