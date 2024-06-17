<template>
  <Navbar :menuItems="handleNavigation" :userEmail="userEmail" :username="username" />
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar/Navbar.vue'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const auth = useAuthStore()

const handleNavigation = computed(() => {
  if (auth.isAuthenticated) {
    const authenticatedMenu = [
      { title: 'Home', path: 'home' },
      { title: 'Todas As Cartas', path: 'allCards' },
      { title: 'Trocas em aberto', path: 'trades' },
      { title: 'Inventário', path: 'inventory' },
      { title: 'Sair', action: 'logout' }
    ]
    return authenticatedMenu
  } else {
    const unauthenticatedMenu = [
      { title: 'Home', path: 'home' },
      { title: 'Todas As Cartas', path: 'allCards' },
      { title: 'Trocas em aberto', path: 'trades' },
      { title: 'Login', path: 'login' }
    ]
    return unauthenticatedMenu
  }
})
const userEmail = computed(() => {
  if (!auth.isAuthenticated) return ''
  const email = auth.userEmail

  return email
})
const username = computed(() => {
  if (!auth.isAuthenticated) return ''
  const username = auth.username

  return username
})
</script>

<style>
#app {
}
</style>
