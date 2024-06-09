<template>
  <div class="container-wrapper">
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-wrapper-logo">
          <img src="@/assets/images/logo.png" alt="logo" />
        </div>
        <div class="login-form">
          <div class="login-form-title">
            <span class="login-form-title-text">{{ labels.login }}</span>
          </div>
          <div class="login-form-email">
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
              append-inner-icon="mdi-email"
              variant="outlined"
              density="compact"
              required
              rounded
            ></v-text-field>
          </div>
          <div class="login-form-password">
            <v-text-field
              v-model="password"
              type="password"
              label="Senha"
              rounded
              append-inner-icon="mdi-lock"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </div>
          <div class="login-form-button">
            <v-btn variant="flat" rounded width="100%" class="login-button btn" @click="login">
              {{ labels.enter }}
            </v-btn>
          </div>
          <div class="divider">
            <span class="divider-text">ou</span>
          </div>
          <v-btn variant="flat" rounded width="100%" class="register-button btn" @click="login">
            {{ labels.register }}</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const labels = reactive({
  enter: 'Entrar',
  register: 'Cadastre-se',
  or: 'or',
  login: 'Log in!'
})
const email = ref('')
const password = ref('')
</script>

<style scoped lang="scss" src="./style.scss"></style>
