<script setup lang="ts">
import { type IConfirm } from './types'
import ModalWindow from '@/widgets/modalWindow/modalWindow.vue'
import ButtonControl from '@/features/buttonControl/buttonControl.vue'
const confirm = defineProps<IConfirm>()
</script>

<template>
  <ModalWindow v-if="confirm.show" :onClose="confirm.onClose">
    <template v-slot:title>
      {{ confirm.title }}
    </template>
    <template v-slot:body>
      {{ confirm.body }}
    </template>
    <template v-slot:footer>
      <div>
        <ButtonControl
          :title="confirm.btnConfirmTitle"
          :disabled="false"
          @click="confirm.onAction"
        />
      </div>
      <div><ButtonControl title="Отмена" :disabled="false" @click="confirm.onClose" /></div>
    </template>
  </ModalWindow>
</template>

<style scoped>
.buttonContainer div {
  padding: 0px 5px 0px 5px;
}
</style>
