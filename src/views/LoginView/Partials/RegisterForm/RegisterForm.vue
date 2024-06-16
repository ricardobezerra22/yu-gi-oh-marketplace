<template>
  <v-form @submit.prevent="submitForm" class="register-form">
    <InputFields
      v-model="registerForm.name"
      :label="registerFormLabels.name"
      :rules="validationRules.required"
      :icon="icons.mdiAccount"
    />
    <InputFields
      v-model="registerForm.email"
      :label="registerFormLabels.email"
      :type="type.email"
      :icon="icons.mdiEmail"
      :rules="validationRules.email"
    />
    <InputFields
      v-model="registerForm.password"
      :label="registerFormLabels.password"
      :type="type.password"
      :icon="icons.mdiLock"
      :rules="validationRules.required"
    />
    <InputFields
      v-model="registerForm.confirmPassword"
      :label="registerFormLabels.confirmPassword"
      :type="type.password"
      :icon="icons.mdiLock"
      :rules="validationRules.confirmPassword"
    />
    <v-card-actions class="dialog-action-buttons">
      <v-btn type="submit" class="submit-register btn" rounded>
        {{ actionButtons.submit }}
      </v-btn>
      <v-btn class="cancel-register btn" rounded @click="resetForm">
        {{ actionButtons.cancel }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { userRegister } from '@/services/register/index.js'
import InputFields from '@/components/InputFields/InputFields.vue'

const emit = defineEmits(['handlerRegister', 'closeDialog'])

const type = {
  email: 'email',
  password: 'password'
}
const icons = {
  mdiAccount: 'mdi-account',
  mdiEmail: 'mdi-email',
  mdiLock: 'mdi-lock'
}
const actionButtons = {
  submit: 'Concluir',
  cancel: 'Cancelar'
}

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerFormLabels = {
  name: 'Nome',
  email: 'E-mail',
  password: 'Senha',
  confirmPassword: 'Confirme sua senha'
}

const validationRules = {
  email: [
    (value) => !!value || 'Campo obrigatório!',
    (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(value) || 'E-mail inválido.'
    }
  ],
  required: [
    (value) => !!value || 'Campo obrigatório!',
    (value) => (value && value.length >= 3) || 'Mínimo de 3 caracteres!'
  ],
  confirmPassword: [
    (value) => !!value || 'Campo obrigatório!',
    (value) => value === registerForm.value.password || 'As senhas precisam ser iguais!'
  ]
}

const resetForm = () => {
  registerForm.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  emit('closeDialog')
}

const showAlert = (success, message) => {
  const alert = {
    show: true,
    type: success ? 'success' : 'error',
    title: success ? 'Cadastro realizado com sucesso!' : 'Erro ao registrar usuário!',
    text: success ? 'Agora realize o login!' : message
  }
  emit('handlerRegister', alert)
}

const submitForm = async () => {
  if (isFormValid()) {
    try {
      await userRegister(getFormData())
      showAlert(true, '')
      resetForm()
    } catch (error) {
      showAlert(false, error.response.data.message)
    }
  }
}

const isFormValid = () => {
  return (
    registerForm.value.name &&
    registerForm.value.email &&
    registerForm.value.password &&
    registerForm.value.confirmPassword &&
    registerForm.value.password === registerForm.value.confirmPassword
  )
}

const getFormData = () => {
  return {
    name: registerForm.value.name,
    email: registerForm.value.email,
    password: registerForm.value.password
  }
}
</script>

<style scoped src="./style.scss"></style>
