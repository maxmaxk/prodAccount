<script setup lang="ts">
import MenuHeader from '@/features/menuHeader/menuHeader.vue'
import Menu from '@/widgets/menu/menu.vue'
import { type IMainMenu } from './types'
defineProps<IMainMenu>()
</script>

<template>
  <header :class="`mainmenu ${isOpen ? 'open' : 'close'}`">
    <MenuHeader />
    <Menu />
  </header>
</template>

<style scoped>
.mainmenu {
  background: var(--base-dark-background);
  transition: all 0.3s linear;
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  &.open {
    width: 280px;
    min-width: 280px;
  }
  &.close {
    width: 68px;
    min-width: 68px;
  }
}
</style>
