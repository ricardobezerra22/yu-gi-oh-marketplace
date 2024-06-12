<template>
  <Navbar :menuItems="menuItems" :userEmail="userEmail" :username="username" />
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar/Navbar.vue'
import { ref } from 'vue'

const menuItems = ref([
  { title: 'Home', path: 'home' },
  { title: 'Todas As Cartas', path: 'allCards' },
  { title: 'Trocas em aberto', path: 'trades' },
  { title: 'Inventário', path: 'inventory' },
  { title: 'Login', path: 'login' },
  { title: 'Sair', action: 'logout' }
])
const userEmail = ref('email')
const username = ref('username')
</script>

<style>
/* #app {
  background-image: url('@/assets/images/wall.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */
</style>
