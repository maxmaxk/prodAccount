<script setup lang="ts">
import type { ITextareaControl } from './types'
defineProps<ITextareaControl>()
defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
textarea {
  width: 100%;
  background: var(--input-background);
  border: 1px solid var(--control-border-color);
  box-sizing: border-box;
  border-radius: 2px;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  color: var(--caption-color);
  padding: 15px 17px;
  outline: none;
  font-family: 'Gilroy', sans-serif;
  &:disabled {
    cursor: not-allowed;
    background: var(--input-background-disabled);
  }
}
</style>
