<script setup lang="ts">
import { ETagType } from '@/features/caption/types'
import CaptionControl from '@/features/caption/caption.vue'
import { machineTypesStore } from '@/entities/machineTypes/store'
import FilterControl from '@/widgets/filterControl/filterControl.vue'
import TableControl from '@/widgets/tableControl/tableControl.vue'
import Pagination from '@/widgets/pagination/pagination.vue'
import ButtonControl from '@/features/buttonControl/buttonControl.vue'
import ModalWindow from '@/widgets/modalWindow/modalWindow.vue'
import Confirm from '@/widgets/confirm/confirm.vue'
import InputControl from '@/features/inputControl/inputControl.vue'
import { EEditType } from '@/shared/commonTypes/tableTypes'
import { ref } from 'vue'
import { type IConfirm } from '@/widgets/confirm/types'
import MachineTypeReasons from '@/widgets/machineTypeReasons/machineTypeReasons.vue'
import type { IMachineType } from '@/shared/api/getMachineTypes'

machineTypesStore.getMachineTypes()
machineTypesStore.setHandler()

const insertMachineTypeForm = () => {
  machineTypesStore.clearEditFields!()
  machineTypesStore.selectEditRow = ''
  machineTypesStore.showEdit = true
}

const confirm = ref<IConfirm>({
  show: false,
  title: 'Внимание!',
  body: 'Удалить тип(ы) станка(ов)?',
  btnConfirmTitle: 'Удалить',
  onAction() {
    confirm.value.show = false
    machineTypesStore.deleteRows!()
  },
  onClose() {
    confirm.value.show = false
  }
})

const saveMachineType = async () => {
  machineTypesStore.showEdit = false
  let rowData: Record<string, string> = {}
  machineTypesStore.editFields!.forEach((field) => {
    rowData[field.field] = field.value
  })

  if (machineTypesStore.selectEditRow)
    await machineTypesStore.updateMachineType(rowData as unknown as IMachineType)
  else await machineTypesStore.insertMachineType(rowData as unknown as IMachineType)
  machineTypesStore.getMachineTypes()
}

const editCloseHandler = () => {
  setTimeout(() => (machineTypesStore.showEdit = false))
}

const getTitle = () => {
  if (machineTypesStore.selectEditRow) return 'Редактировать тип станка'
  else return 'Добавить тип станка'
}
</script>

<template>
  <CaptionControl title="Типы станков" :tagType="ETagType.H1" />
  <FilterControl :filterStore="machineTypesStore"></FilterControl>
  <TableControl class="machineTypesTable" :tableStore="machineTypesStore"></TableControl>

  <div class="buttonContainer">
    <div>
      <ButtonControl
        title="Добавить"
        :disabled="machineTypesStore.isLoading"
        @click="insertMachineTypeForm"
      />
    </div>
    <div>
      <ButtonControl
        title="Удалить"
        :disabled="machineTypesStore.isLoading || !machineTypesStore.selectRows!.length"
        @click="confirm.show = true"
      />
    </div>
  </div>
  <Pagination class="machineTypesPaginator" :paginationModel="machineTypesStore.paginationModel" />

  <Confirm
    :show="confirm.show"
    :title="confirm.title"
    :body="confirm.body"
    :btn-confirm-title="confirm.btnConfirmTitle"
    :on-action="confirm.onAction"
    :on-close="confirm.onClose"
  >
  </Confirm>

  <ModalWindow v-if="machineTypesStore.showEdit" :onClose="editCloseHandler">
    <template v-slot:title>
      {{ getTitle() }}
    </template>
    <template v-slot:body>
      <div v-for="(edit, index) in machineTypesStore.editFields" :key="index">
        <InputControl
          v-if="edit.type === EEditType.Text"
          :placeholder="edit.title"
          :disabled="false"
          :type="edit.type"
          v-model="edit.value"
        ></InputControl>
      </div>
    </template>
    <template v-slot:footer>
      <div><ButtonControl title="Сохранить" :disabled="false" @click="saveMachineType" /></div>
      <div><ButtonControl title="Отмена" :disabled="false" @click="editCloseHandler" /></div>
    </template>
  </ModalWindow>
  <MachineTypeReasons
    v-if="machineTypesStore.showEditReasons"
    :mtid="machineTypesStore.selectEditRow!"
  ></MachineTypeReasons>
</template>

<style scoped>
.machineTypesTable {
  margin: 5px 20px 20px 20px;
}
.machineTypesPaginator {
  padding: 0px 20px 10px 20px;
  flex-grow: 1;
  align-content: flex-end;
}

.buttonContainer {
  display: flex;
  justify-content: center;
}

.buttonContainer div {
  padding: 0px 5px 0px 5px;
}
</style>
