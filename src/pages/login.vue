<script setup lang="ts">
import { userStore } from '@/entities/user/store'
import { ref } from 'vue'
import config from '@/app/config'
import LoginLogo from '@/features/loginLogo/loginLogo.vue'
import Panel from '@/features/panel/panel.vue'
import CaptionControl from '@/features/caption/caption.vue'
import ButtonControl from '@/features/buttonControl/buttonControl.vue'
import InputControl from '@/features/inputControl/inputControl.vue'
import CheckControl from '@/features/checkControl/checkControl.vue'
import { ETagType } from '@/features/caption/types'
import Waiting from '@/widgets/waiting/waiting.vue'
import { EWaitingType } from '@/widgets/waiting/types'

const login = ref(config.DEFAULT_USER ?? '')
const password = ref('')
const remember = ref(false)
const loginHandler = (): void => {
  userStore.makeLogin(login.value, password.value, remember.value)
}
</script>

<template>
  <main>
    <div class="login">
      <LoginLogo class="loginLogo" />
      <Panel>
        <CaptionControl title="Вход в Администратор Evomatics" :tagType="ETagType.H2" />
        <form @submit.prevent="loginHandler">
          <InputControl
            v-model="login"
            placeholder="Логин"
            type="text"
            class="field"
            :disabled="userStore.isLoading"
          />
          <InputControl
            v-model="password"
            placeholder="Пароль"
            type="password"
            class="field"
            :disabled="userStore.isLoading"
          />
          <CheckControl
            v-model="remember"
            title="Запомнить меня"
            :disabled="userStore.isLoading"
            id="rememberLogin"
          />
          <div class="buttonContainer">
            <ButtonControl title="Войти" :disabled="userStore.isLoading" />
          </div>
        </form>
      </Panel>
      <Waiting v-if="userStore.isLoading" :type="EWaitingType.Fixed" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  background-color: var(--login-color-background);
  height: 100vh;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
.login {
  max-width: 360px;
  width: 100%;
}
.loginLogo {
  margin-bottom: 30px;
}
.field {
  margin-bottom: 10px;
}
.buttonContainer {
  display: flex;
  justify-content: center;
}
</style>
