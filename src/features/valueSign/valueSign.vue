<script setup lang="ts">
import { type IValueSign } from './types'
defineProps<IValueSign>()
</script>

<template>
  <div class="signContainer">
    <div class="value">{{ value }}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style scoped>
.signContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 180px;
  border: 1px solid var(--control-border-color);
  background-color: var(--caption-background);
  border-radius: 2px;
  padding: 0 5px;
}
.title,
.value {
  display: inline-block;
  width: 100%;
  font-size: 12px;
}
.title {
  line-height: 16px;
}
.value {
  font-weight: bold;
}
</style>
