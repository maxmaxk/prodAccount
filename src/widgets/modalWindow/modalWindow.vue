<script setup lang="ts">
import { type IModalWindow } from './types'
const { onClose } = defineProps<IModalWindow>()
</script>

<template>
  <div class="modal-shadow">
    <div class="modal">
      <div class="modal-title">
        <h3><slot name="title"></slot></h3>
        <div class="modal-close" :onClick="onClose">&#10006;</div>
      </div>
      <form @submit.prevent>
        <div class="bodyContainer">
          <slot name="body"> </slot>
        </div>
        <div class="buttonContainer">
          <slot name="footer"> </slot>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-shadow {
  position: fixed;
  display: flex;
  z-index: 999;
  top: 0;
  left: 0;
  min-height: 100%;
  height: 100%;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 450px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 95%;
  overflow-y: auto;
}

.buttonContainer {
  display: flex;
  justify-content: center;
}

.modal-title {
  display: flex;
}

.modal-close {
  border-radius: 50%;
  display: flex;
  align-items: right;
  justify-content: center;
  position: absolute;
  top: 7px;
  right: 7px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.buttonContainer div {
  padding: 0px 5px 0px 5px;
}

.bodyContainer {
  padding-top: 10px;
}

h3,
h3 div {
  font-weight: bold;
}
</style>
