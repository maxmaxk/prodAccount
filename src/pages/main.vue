<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import { RouterView, type RouteLocationNormalizedLoaded } from 'vue-router'
import Mainmenu from '@/widgets/mainmenu/mainmenu.vue'
import Mainarea from '@/features/mainArea/mainArea.vue'
import UserStatus from '@/pages/userStatus.vue'
import NotFound from '@/pages/notFound.vue'
import RegistrarStatus from '@/pages/registrarStatus.vue'
import { userStore } from '@/entities/user/store'
import { EUserRole } from '@/entities/user/types'
import router from '@/app/router'

const mobileWidth = 767
const openMenu = ref<boolean>(window.innerWidth > mobileWidth)
const isUserAdmin = computed<boolean>(() => userStore.role === EUserRole.Admin)
if (!isUserAdmin.value) router.push(`/user/${userStore.id}`)
provide('openMenu', openMenu)
onMounted(() => {
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
const onResize = (e: UIEvent) => {
  const width = (e.target as Window).innerWidth
  openMenu.value = width > mobileWidth
}
const getUserComponent = (route: RouteLocationNormalizedLoaded) => {
  if (route.path.includes('/user/')) return UserStatus
  if (route.path.includes('/registrar/')) return RegistrarStatus
  return NotFound
}
</script>

<template>
  <Mainmenu :isOpen="openMenu.valueOf()" />
  <Mainarea :isOpen="openMenu.valueOf()">
    <RouterView v-slot="{ Component, route }">
      <component :is="isUserAdmin ? Component : getUserComponent(route)" />
    </RouterView>
  </Mainarea>
</template>
