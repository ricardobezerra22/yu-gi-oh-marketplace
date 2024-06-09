<template>
  <div class="container-wrapper">
    <div class="background"></div>
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-wrapper-logo">
          <img src="@/assets/images/logo.png" width="256px" alt="logo" />
        </div>
        <div class="login-form">
          <div class="login-form-title">
            <span class="login-form-title-text">Faça login</span>
          </div>
          <div class="login-form-email">
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </div>
          <div class="login-form-password">
            <v-text-field
              v-model="password"
              type="password"
              label="Senha"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </div>
          <div class="login-form-button">
            <v-btn color="success">Entrar</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style scoped lang="scss" src="./style.scss"></style>
