<script setup lang="ts">
import { ETagType } from '@/features/caption/types'
import CaptionControl from '@/features/caption/caption.vue'
import { machineTypeCommentsStore } from '@/entities/machineTypeComments/store'
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
import { useRoute } from 'vue-router'
import router from '@/app/router'
import type { IMachineTypeComment } from '@/shared/api/getMachineTypeComments'
const machineTypeTitle = ref<string>('')
const route = useRoute()
machineTypeCommentsStore.machineTypeId = parseInt(route.params.machineTypeId as string)
machineTypesStore
  .getMachineTypeName(machineTypeCommentsStore.machineTypeId)
  .then((machineTypeName) => {
    machineTypeTitle.value = `Стандартные комментарии, тип станка: ${machineTypeName}`
  })
machineTypeCommentsStore.getMachineTypeComments()
machineTypeCommentsStore.setHandler()

const insertMachineTypeCommentForm = () => {
  machineTypeCommentsStore.clearEditFields!()
  machineTypeCommentsStore.selectEditRow = ''
  machineTypeCommentsStore.showEdit = true
}

const confirm = ref<IConfirm>({
  show: false,
  title: 'Внимание!',
  body: 'Удалить комментарий(и)?',
  btnConfirmTitle: 'Удалить',
  onAction() {
    confirm.value.show = false
    machineTypeCommentsStore.deleteRows!()
  },
  onClose() {
    confirm.value.show = false
  }
})

const saveMachineTypeComment = async () => {
  machineTypeCommentsStore.showEdit = false
  let rowData: Record<string, string> = {}
  machineTypeCommentsStore.editFields!.forEach((field) => {
    rowData[field.field] = field.value
  })

  if (machineTypeCommentsStore.selectEditRow)
    await machineTypeCommentsStore.updateMachineTypeComment(
      rowData as unknown as IMachineTypeComment
    )
  else
    await machineTypeCommentsStore.insertMachineTypeComment(
      rowData as unknown as IMachineTypeComment
    )
  machineTypeCommentsStore.getMachineTypeComments()
}

const editCloseHandler = () => {
  machineTypeCommentsStore.showEdit = false
}

const getTitle = () => {
  if (machineTypeCommentsStore.selectEditRow) return 'Редактировать комментарий'
  else return 'Добавить комментарий'
}

const backMachineTypes = () => {
  router.back()
}
</script>

<template>
  <CaptionControl :title="machineTypeTitle" :tagType="ETagType.H1" />
  <FilterControl :filterStore="machineTypeCommentsStore"></FilterControl>
  <TableControl
    class="machineTypeCommentsTable"
    :tableStore="machineTypeCommentsStore"
  ></TableControl>
  <div class="buttonContainer">
    <div>
      <ButtonControl
        title="Добавить"
        :disabled="machineTypeCommentsStore.isLoading"
        @click="insertMachineTypeCommentForm"
      />
    </div>
    <div>
      <ButtonControl
        title="Удалить"
        :disabled="
          machineTypeCommentsStore.isLoading || !machineTypeCommentsStore.selectRows!.length
        "
        @click="confirm.show = true"
      />
    </div>
    <div>
      <ButtonControl
        title="Назад"
        :disabled="machineTypeCommentsStore.isLoading"
        @click="backMachineTypes"
      />
    </div>
  </div>
  <Pagination
    class="machineTypeCommentsPaginator"
    :paginationModel="machineTypeCommentsStore.paginationModel"
  />

  <Confirm
    :show="confirm.show"
    :title="confirm.title"
    :body="confirm.body"
    :btn-confirm-title="confirm.btnConfirmTitle"
    :on-action="confirm.onAction"
    :on-close="confirm.onClose"
  >
  </Confirm>

  <ModalWindow v-if="machineTypeCommentsStore.showEdit" :onClose="editCloseHandler">
    <template v-slot:title>
      {{ getTitle() }}
    </template>
    <template v-slot:body>
      <div v-for="(edit, index) in machineTypeCommentsStore.editFields" :key="index">
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
      <div>
        <ButtonControl title="Сохранить" :disabled="false" @click="saveMachineTypeComment" />
      </div>
      <div><ButtonControl title="Отмена" :disabled="false" @click="editCloseHandler" /></div>
    </template>
  </ModalWindow>
</template>

<style scoped>
.machineTypeCommentsTable {
  margin: 5px 20px 20px 20px;
}
.machineTypeCommentsPaginator {
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
