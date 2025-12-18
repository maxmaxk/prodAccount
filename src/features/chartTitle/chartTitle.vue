<script setup lang="ts">
import { type IChartTitle } from './types'
defineProps<IChartTitle>()
</script>

<template>
  <div class="title">
    <span>{{ title }}</span>
  </div>
</template>

<style scoped>
.title {
  width: 100%;
  text-align: center;
}
</style>
