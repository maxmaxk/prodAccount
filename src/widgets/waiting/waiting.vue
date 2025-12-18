<script setup lang="ts">
import { EWaitingType, type IWaiting } from './types'
defineProps<IWaiting>()
</script>

<template>
  <div :class="`spinner ${type === EWaitingType.Fixed ? 'fixed' : 'absolute'}`"></div>
</template>

<style scoped>
.spinner {
  background: url('./loader.gif');
  height: 40px;
  width: 40px;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  &.fixed {
    position: fixed;
  }
  &.absolute {
    position: absolute;
  }
  z-index: 999;
}
</style>
