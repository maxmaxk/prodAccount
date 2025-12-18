<script setup lang="ts">
import { getStrOnTime } from '@/shared/utils/utils'
import type { IColorBar } from './types'
defineProps<IColorBar>()
</script>

<template>
  <div class="chartContainer">
    <span class="title">{{ name }}</span>
    <div :style="`width: ${percent}%`" class="bar">
      <div class="sign">
        {{ `${percent.toFixed(1)}% ${getStrOnTime(duration)}` }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.chartContainer {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: calc(100% - 20px);
  & .title {
    font-weight: bold;
    font-size: 12px;
  }
  & .bar {
    position: relative;
    background-color: red;
    height: 20px;
    & .sign {
      position: absolute;
      font-weight: bold;
      font-size: 12px;
      text-wrap: nowrap;
    }
  }
}
</style>
