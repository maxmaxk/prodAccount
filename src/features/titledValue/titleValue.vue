<script setup lang="ts">
import { type ITitledValue, EStyle } from './types'
defineProps<ITitledValue>()
</script>

<template>
  <div class="container">
    <span class="title">{{ `${title}:` }}</span>
    <span :class="`value ${valueStyle === EStyle.Highlight ? 'highlight' : ''}`">{{ value }}</span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  height: 38px;
  align-items: center;
}
.title {
  padding-left: 10px;
  width: 40%;
}
.value {
  font-weight: bold;
  padding-right: 10px;
}
.highlight {
  color: var(--enable-user-label);
}
</style>
