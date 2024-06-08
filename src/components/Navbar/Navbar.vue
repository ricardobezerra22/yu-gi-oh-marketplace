<template>
  <div></div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const { sm } = useDisplay()
const menuItems = ref([
  { title: 'Home', value: 'home' },
  { title: 'Todas As Cartas', value: 'all-cards' },
  { title: 'Trocas em aberto', value: 'open-trades' },
  { title: 'Inventário', value: 'inventory' },
  { title: 'Login', value: 'login' },
  { title: 'Sair', value: 'logout' }
])
const isMobile = ref(false)

watch(sm, () => {
  isMobile.value = sm.value
})
onMounted(() => {
  isMobile.value = sm.value
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
