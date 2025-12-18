<script setup lang="ts">
import { getStatusColor } from '@/entities/registrar/chartModel'
import type { IColorPercentPanel } from './types'
import { registrarStatusStore } from '@/entities/registrarStatus/store'
defineProps<IColorPercentPanel>()

const getPercent = (onTime: number, totalTime: number): number =>
  totalTime > 0 ? Math.min(100, (100 * onTime) / totalTime) : 0
</script>

<template>
  <div class="chartContainer">
    <div
      v-for="panel in panels"
      :key="panel.statField"
      :style="`width: ${
        registrarStatusStore?.totals
          ? (100 * registrarStatusStore.totals[panel.statField]) /
            registrarStatusStore.totals.total_time
          : 0
      }%; background-color: ${getStatusColor(panel.opmode)}`"
      :title="panel.title"
    ></div>
  </div>
</template>

<style scoped>
.chartContainer {
  display: flex;
  flex-direction: row;
  width: calc(100% - 20px);
  border: 1px solid var(--control-border-color);
  margin: 10px;
  height: 20px;
  & .s1 {
    background-color: green;
    height: 20px;
  }
  & .s2 {
    background-color: blue;
    height: 20px;
  }
}
</style>
