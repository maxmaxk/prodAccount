<script setup lang="ts">
import type { ICheckControl } from './types'
defineProps<ICheckControl>()
defineEmits(['update:modelValue'])
</script>

<template>
  <label :class="`checkboxContainer ${disabled ? 'disabled' : ''}`">
    <input
      :disabled="disabled"
      :id="id"
      :checked="modelValue"
      type="checkbox"
      class="checkbox"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <label :for="id" class="icon"></label>
    <span>{{ title }}</span>
  </label>
</template>

<style scoped>
.icon {
  width: 22px;
  height: 22px;
  border: 1px solid var(--checkbox-icon-border);
  border-radius: 2px;
  position: relative;
  font-family: 'icomoon';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  font-size: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--checkbox-unchecked);
}

.checkbox + .icon {
  background: var(--checkbox-unchecked);
}
.checkboxContainer {
  display: flex;
  cursor: pointer;
  & > .icon {
    cursor: pointer;
  }
  &.disabled,
  &.disabled > .icon {
    cursor: not-allowed;
  }
  & > span {
    font-size: 12px;
    padding-left: 11px;
    color: var(--checkbox-color);
  }
}

.checkbox {
  display: none;
}

.checkbox + label:before {
  content: '';
}

.checkbox:checked + label:before {
  content: '\E90A';
}

.checkbox:checked + .icon {
  background: var(--checkbox-checked);
  border-color: var(--checkbox-checked);
}
</style>
