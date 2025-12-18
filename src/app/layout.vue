<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '@/entities/user/store'
import { EUserState } from '@/entities/user/types'
import Login from '@/pages/login.vue'
import Main from '@/pages/main.vue'
import Waiting from '@/widgets/waiting/waiting.vue'
import { EWaitingType } from '@/widgets/waiting/types'
const isLogined = computed<boolean>(() => userStore.isUserLogin())
if (isLogined.value) {
  userStore.getCurrentUser()
}
</script>

<template>
  <Main v-if="userStore.userState === EUserState.Logined" />
  <Login
    v-if="userStore.userState === EUserState.Logout || userStore.userState === EUserState.Fail"
  />
  <Waiting v-if="userStore.userState === EUserState.Logining" :type="EWaitingType.Fixed" />
</template>
