<script setup lang="ts">
import { machineTypesStore } from '@/entities/machineTypes/store'
import { machineTypeReasonsStore } from '@/entities/machineTypeReasons/store'
import TableControl from '@/widgets/tableControl/tableControl.vue'
import ButtonControl from '@/features/buttonControl/buttonControl.vue'
import ModalWindow from '@/widgets/modalWindow/modalWindow.vue'
import Confirm from '@/widgets/confirm/confirm.vue'
import InputControl from '@/features/inputControl/inputControl.vue'
import { EEditType } from '@/shared/commonTypes/tableTypes'
import { ref } from 'vue'
import { type IConfirm } from '@/widgets/confirm/types'
import CheckControlControl from '@/features/checkControl/checkControl.vue'
import type { IMachineTypeReasons } from './types'
import SelectControl from '@/features/selectControl/selectControl.vue'

const props = defineProps<IMachineTypeReasons>()
machineTypeReasonsStore.mtid = props.mtid
const init = async () => {
  await machineTypeReasonsStore.getMachineTypeReasons()
  machineTypeReasonsStore.getAllReasons(true)
}

init()

const insertMachineTypeReasonsForm = () => {
  machineTypeReasonsStore.clearEditFields!()
  machineTypeReasonsStore.selectEditRow = ''
  machineTypeReasonsStore.showEdit = true
}

const confirm = ref<IConfirm>({
  show: false,
  title: 'Внимание!',
  body: 'Удалить тип(ы) простоя из списка?',
  btnConfirmTitle: 'Удалить',
  onAction() {
    confirm.value.show = false
    machineTypeReasonsStore.deleteRows!()
  },
  onClose() {
    confirm.value.show = false
  }
})

const editCloseHandler = () => {
  setTimeout(() => (machineTypeReasonsStore.showEdit = false))
}

const closeReasons = () => {
  setTimeout(() => (machineTypesStore.showEditReasons = false))
}

const getTitle = () => {
  if (machineTypeReasonsStore.selectEditRow) return 'Редактировать'
  else return 'Добавить'
}

const saveHandler = () => {
  machineTypeReasonsStore.saveMachineTypeReasons()
}
</script>

<template>
  <ModalWindow :onClose="closeReasons">
    <template v-slot:title> Типы простоя </template>
    <template v-slot:body>
      <TableControl
        class="shiftsTable"
        :tableStore="machineTypeReasonsStore"
        id="checkAll2"
      ></TableControl>
    </template>
    <template v-slot:footer>
      <div class="buttonContainer">
        <div>
          <ButtonControl
            title="Добавить"
            :disabled="machineTypeReasonsStore.isLoading"
            @click="insertMachineTypeReasonsForm"
          />
        </div>
        <div>
          <ButtonControl
            title="Удалить"
            :disabled="
              machineTypeReasonsStore.isLoading || !machineTypeReasonsStore.selectRows!.length
            "
            @click="confirm.show = true"
          />
        </div>
        <div><ButtonControl title="Отмена" :disabled="false" @click="closeReasons" /></div>
      </div>
    </template>
  </ModalWindow>
  <ModalWindow v-if="machineTypeReasonsStore.showEdit" :onClose="editCloseHandler">
    <template v-slot:title>
      {{ getTitle() }}
    </template>
    <template v-slot:body>
      <div
        class="editFiled"
        v-for="(edit, index) in machineTypeReasonsStore.editFields"
        :key="index"
      >
        <InputControl
          v-if="
            edit.type === EEditType.Text ||
            edit.type === EEditType.Number ||
            edit.type === EEditType.Date
          "
          :placeholder="edit.title"
          :disabled="false"
          :required="edit.required!"
          :type="edit.type"
          v-model="edit.value"
        ></InputControl>
        <CheckControlControl
          v-if="edit.type === EEditType.Checkbox"
          :title="edit.title"
          :disabled="false"
          :id="edit.id!"
          v-model="edit.value"
        ></CheckControlControl>
        <SelectControl
          v-if="edit.type === EEditType.Select || edit.type === EEditType.SelectNumber"
          title=""
          :title2="edit.title"
          :type="edit.type"
          :required="edit.required"
          :disabled="edit.readonly! && machineTypesStore.selectEditRow !== ''"
          :options="edit.options!"
          v-model="edit.value"
        ></SelectControl>
      </div>
    </template>
    <template v-slot:footer>
      <div><ButtonControl title="Сохранить" :disabled="false" @click="saveHandler" /></div>
      <div><ButtonControl title="Отмена" :disabled="false" @click="editCloseHandler" /></div>
    </template>
  </ModalWindow>
  <Confirm
    :show="confirm.show"
    :title="confirm.title"
    :body="confirm.body"
    :btn-confirm-title="confirm.btnConfirmTitle"
    :on-action="confirm.onAction"
    :on-close="confirm.onClose"
  >
  </Confirm>
</template>

<style scoped>
.editFiled {
  margin-bottom: 4px;
}

.shiftsTable {
  margin: 0;
  overflow-x: auto;
}

.buttonContainer {
  display: flex;
  justify-content: center;
}

.buttonContainer div {
  padding: 0px 5px 0px 5px;
}
</style>
