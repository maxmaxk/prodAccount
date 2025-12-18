<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { registrarStatusStore } from '@/entities/registrarStatus/store'

const refresh = (): void => {
  const oee = registrarStatusStore.oee
  const canvas = document.querySelector('canvas')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 7
      ctx.strokeStyle = '#D7DFF1'
      ctx.beginPath()
      ctx.arc(100, 100, 70, -Math.PI / 2, (3 / 2) * Math.PI, false)
      ctx.stroke()
      ctx.strokeStyle = '#39BA5D'
      ctx.beginPath()
      ctx.arc(100, 100, 70, -Math.PI / 2, -Math.PI / 2 + oee * 0.02 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = '#39BA5D'
      ctx.textAlign = 'center'
      ctx.font = '30px Gilroy'
      ctx.fillText(`${oee}%`, 100, 110)
    }
  }
}

watch(
  () => [registrarStatusStore.oee],
  () => {
    refresh()
  }
)

onMounted(() => {
  refresh()
})
</script>

<template>
  <div class="chartContainer">
    <div class="title">OEE</div>
    <div class="canvasContainer">
      <canvas id="chartdiv" width="200" height="200"></canvas>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  text-align: center;
}
.canvasContainer {
  display: flex;
  justify-content: center;
}
</style>
