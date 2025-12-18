<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { type IMenuItem, EMenuItem } from '@/features/menuItemControl/types'
import MenuItemControl from '@/features/menuItemControl/menuItemControl.vue'

// prettier-ignore
const menuItems: IMenuItem[] = [
  {
    id: uuidv4(),
    title: 'Мониторинг по станкам',
    icon: 'monIcon',
    link: 'registrars-report',
    type: EMenuItem.Link
  },
  {
    id: uuidv4(),
    title: 'Панель эффективности',
    icon: 'effIcon',
    link: 'plant-report',
    type: EMenuItem.Link
  },
  { 
    id: uuidv4(),
    title: 'Журнал событий',
    icon: 'jourIcon',
    link: 'log',type: EMenuItem.Link
  },
  { 
    id: uuidv4(),
    title: 'Отчеты',
    icon: 'repIcon',
    link: 'reports',
    type: EMenuItem.Link
  },
  {
    id: uuidv4(), title: 'Настройки',
    icon: 'setIcon',
    type: EMenuItem.Submenu,
    childs: [
      {
        id: uuidv4(),
        title: 'Регистраторы',
        icon: 'regIcon',
        link: 'registrars',
        type: EMenuItem.Link
      },
      { 
        id: uuidv4(),
        title: 'Пользователи',
        icon: 'usrIcon',
        link: 'users',
        type: EMenuItem.Link 
      },
      { 
        id: uuidv4(),
        title: 'Смены',
        icon: 'shiftIcon',
        link: 'shifts',
        type: EMenuItem.Link
      },
      { 
        id: uuidv4(),
        title: 'Цехи',
        icon: 'wrkIcon',
        link: 'workshops',
        type: EMenuItem.Link
      },
      {
        id: uuidv4(),
        title: 'Типы станков',
        icon: 'machIcon',
        link: 'machine-types',
        type: EMenuItem.Link
      },
      {
        id: uuidv4(),
        title: 'Причины простоя',
        icon: 'machIcon',
        link: 'reasons',
        type: EMenuItem.Link
      },
      {
        id: uuidv4(),
        title: 'Список изделий',
        icon: 'machIcon',
        link: 'items',
        type: EMenuItem.Link
      }
    ]
  },
  { 
    id: uuidv4(),
    title: 'Система',
    icon: 'sysIcon',
    link: 'settings',
    type: EMenuItem.Link
  },
  { 
    id: uuidv4(),
    title: 'Выход',
    icon: 'logoutIcon',
    type: EMenuItem.Logout,
    userPermission: true
  }
]
</script>

<template>
  <nav>
    <MenuItemControl
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      :menuItem="menuItem"
      :level="0"
    />
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
