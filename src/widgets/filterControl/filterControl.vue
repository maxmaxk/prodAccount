<script setup lang="ts">
import { EFilterType } from '@/shared/commonTypes/filterTypes'
import { type IFilterControl } from './types'
import SelectControl from '@/features/selectControl/selectControl.vue'
import { ref, watch, type Ref } from 'vue'
import { EEditType } from '@/shared/commonTypes/tableTypes'

const { filterStore } = defineProps<IFilterControl>()
const refValues: Ref<string>[] = []
filterStore.filters.forEach((filter, index) => {
  if (filter.type === EFilterType.Select) {
    refValues[index] = ref<string>(
      String(filter.value) ?? (filter.options ? filter.options[0].value : '')
    )
  } else {
    refValues[index] = ref<string>(String(filter.value))
  }
  watch(refValues[index], () => filterStore.changeFilter(index, refValues[index].value))
})
</script>

<template>
  <div class="filter">
    <div
      v-for="(filter, index) in filterStore.filters"
      :key="index"
      :style="{ width: filter.width }"
    >
      <SelectControl
        v-if="filter.type === EFilterType.Select"
        title=""
        :type="EEditType.Select"
        :options="filter.options ?? []"
        v-model="refValues[index].value"
      >
      </SelectControl>
      <input
        v-else
        :type="filter.type"
        :placeholder="filter.placeHolder"
        v-debounce:300ms="
          (val: any) => {
            refValues[index].value = val
          }
        "
        @input="
          (event) => {
            if (filter.type === EFilterType.DateTime)
              refValues[index].value = (event.target as HTMLInputElement).value
          }
        "
        v-model="filter.value"
      />
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  border: 1px solid var(--control-border-color);
  border-radius: 6px;
  padding: 10px;
  margin: 20px 20px 0px 20px;
  background-color: var(--caption-background);
}

div > div {
  padding: 0 3.5px 0 0px;
}

div > div:last-child {
  padding: 0;
}

input,
input:focus,
input:hover {
  width: 100%;
  font-size: 13px;
  height: 48px;
  padding: 5px 9px;
  border: 1px solid var(--control-border-color);
}
</style>
