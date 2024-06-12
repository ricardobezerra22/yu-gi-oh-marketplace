<template>
  <div class="container-wrapper">
    <Navbar :menuItems="menuItems" :userEmail="userEmail" :username="username" />
  </div>
</template>
<script setup>
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

<style scoped lang="scss" src="./style.scss"></style>
