<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { userStore } from '@/entities/user/store'
import Layout from '@/app/layout.vue'
onBeforeMount(() => {
  userStore.mountProcess()
})
</script>

<template>
  <notifications position="center top" animation-type="velocity" />
  <Layout />
</template>
