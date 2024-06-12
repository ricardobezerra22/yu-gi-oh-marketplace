<template>
  <div class="container-wrapper">
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-wrapper-logo">
          <img src="@/assets/images/logo.png" alt="logo" />
        </div>
        <LoginForm @openRegisterDialog="openRegisterDialog" @handlerLogin="handleLogin" />
      </div>
    </div>
    <DefaultDialog v-model="registerDialog" :title="registerAccount">
      <RegisterForm @closeDialog="closeDialog" @handlerRegister="handleRegister" />
    </DefaultDialog>
    <AlertBus
      :title="alert.title"
      :text="alert.text"
      :type="alert.type"
      :alert="alert.show"
      @closeAlert="closeAlert"
    />
  </div>
</template>

<script setup>
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import DefaultDialog from '@/components/DefaultDialog/DefaultDialog.vue'
import RegisterForm from './Partials/RegisterForm/RegisterForm.vue'
import LoginForm from './Partials/LoginForm/LoginForm.vue'
import { updateAlert } from '@/utils/alertUtils'

import { ref, reactive } from 'vue'

const alert = reactive({
  show: false,
  type: '',
  title: '',
  text: ''
})

const registerDialog = ref(false)
const registerAccount = 'Registro'

const openRegisterDialog = () => {
  registerDialog.value = true
}
const closeDialog = () => {
  registerDialog.value = false
}

const closeAlert = () => {
  alert.show = false
}

const handleRegister = (alertContent) => {
  updateAlert(alert, alertContent)
}

const handleLogin = (alertContent) => {
  updateAlert(alert, alertContent)
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
