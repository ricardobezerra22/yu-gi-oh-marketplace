<template>
  <NavBar @handleHomeNavigation="handleHomeNavigation" />
  <RouterView />
  <Footer />
</template>
<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer/Footer.vue'
import router from '@/router'
import NavBar from '@/components/Navbar/Navbar.vue'
const handleHomeNavigation = () => {
  router.push({ name: 'home' })
}
</script>
