<script setup lang="ts">
interface IButtonControl {
  title: string
  disabled: boolean
}
defineProps<IButtonControl>()
</script>

<template>
  <button :disabled="disabled">{{ title }}</button>
</template>

<style scoped>
button {
  background: var(--button-background);
  box-shadow: 0px 0px 12px var(--button-shadow-background);
  border-radius: 6px;
  width: 140px;
  height: 42px;
  font-weight: 600;
  font-size: 14px;
  line-height: 42px;
  text-align: center;
  color: var(--button-color);
  border: 0;
  margin-top: 13px;
  transition: all 0.3s linear;
  outline: none;
  font-family: 'Gilroy', sans-serif;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 12px var(--button-hover-shadow);
  }
  &:disabled {
    cursor: not-allowed;
    background: var(--input-background-disabled);
  }
}
</style>
