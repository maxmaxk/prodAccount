<script setup lang="ts">
import { ETagType, type ICaption } from './types'
defineProps<ICaption>()
</script>

<template>
  <h1 v-if="tagType === ETagType.H1">{{ title }}</h1>
  <h2 v-if="tagType === ETagType.H2">{{ title }}</h2>
  <div
    v-if="tagType === ETagType.PeriodCaption || tagType === ETagType.PanelCaption"
    class="panel period"
  >
    <span>{{ title }}</span>
    <slot name="period"></slot>
  </div>
</template>

<style scoped>
h1,
h2 {
  background: #ffffff;
  font-weight: bold;
  font-size: 18px;
  color: var(--caption-color);
  padding: 0;
}
h1 {
  line-height: 65px;
  padding-left: 20px;
  border-bottom: 1px solid var(--control-border-color);
}
h2 {
  text-align: center;
  margin-bottom: 17px;
  line-height: 36px;
}

.panel {
  width: 100%;
  border-bottom: 1px solid var(--control-border-color);
  display: flex;
  min-height: 50px;
  & > span {
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    padding-left: 12px;
  }
  &.caption {
    flex-direction: column;
    justify-content: space-around;
  }
  &.period {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 12px;
  }
}
</style>
