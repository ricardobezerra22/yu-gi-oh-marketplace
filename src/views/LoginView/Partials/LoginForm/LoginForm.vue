<template>
  <div class="login-form">
    <div class="login-form-title">
      <span class="login-form-title-text">{{ labels.login }}</span>
    </div>
    <v-form @submit.prevent="login">
      <InputFields
        v-model="email"
        :label="loginFormLabels.email"
        :type="types.email"
        :icon="icons.mdiEmail"
        :rules="validationRules.email"
      />
      <InputFields
        v-model="password"
        :label="loginFormLabels.password"
        :type="types.password"
        :icon="icons.mdiLock"
        :rules="validationRules.required"
      />

      <div class="login-form-button">
        <v-btn variant="flat" rounded width="100%" class="login-button btn" type="submit">
          {{ labels.enter }}
        </v-btn>
      </div>
    </v-form>
    <div class="divider">
      <span class="divider-text">{{ labels.or }}</span>
    </div>
    <v-btn
      variant="flat"
      rounded
      width="100%"
      class="register-button btn"
      @click="openRegisterDialog"
    >
      {{ labels.register }}
    </v-btn>
  </div>
</template>

<script setup>
import InputFields from '@/components/InputFields/InputFields.vue'
import { userLogin } from '@/services/login'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const emit = defineEmits(['openRegisterDialog'])

const openRegisterDialog = () => {
  emit('openRegisterDialog')
}

const labels = {
  enter: 'Entrar',
  register: 'Cadastre-se',
  or: 'ou',
  login: 'Log in!'
}

const loginFormLabels = {
  email: 'Email',
  password: 'Senha'
}

const types = {
  email: 'email',
  password: 'password'
}

const icons = {
  mdiEmail: 'mdi-email',
  mdiLock: 'mdi-lock'
}

const validationRules = {
  email: [
    (value) => !!value || 'Campo obrigatório!',
    (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'E-mail inválido.'
    }
  ],
  required: [
    (value) => !!value || 'Campo obrigatório!',
    (value) => (value && value.length >= 3) || 'Mínimo de 3 caracteres!'
  ]
}

const showAlert = (success, message) => {
  const alert = {
    show: true,
    type: success ? 'success' : 'error',
    title: success ? 'Login efetuado!' : 'Erro ao tentar entrar!',
    text: success ? "Bem-vindo ao YUGIOH!'" : message
  }
  emit('handlerLogin', alert)
}

const resetForm = () => {
  email.value = ''
  password.value = ''
}
const getLoginData = () => {
  return {
    email: email.value,
    password: password.value
  }
}
const isFormValid = () => {
  return email.value && password.value
}
const login = async () => {
  if (isFormValid()) {
    try {
      await userLogin(getLoginData())
      showAlert(true, '')
      resetForm()
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 1500)
    } catch (error) {
      showAlert(false, error.response.data.message)
    }
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
