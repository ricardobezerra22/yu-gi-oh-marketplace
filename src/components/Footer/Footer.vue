<template>
  <v-layout>
    <v-footer class="footer">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon.icon"
          class="mx-4"
          variant="text"
          @click="redirectToLink(icon.link)"
        ></v-btn>
      </div>

      <div class="pt-0">Technical Interview at Dacxi Enterprise by Ricardo Bezerra</div>

      <v-divider></v-divider>

      <div>
        &copy; {{ getYear() }} —
        <strong>Bitcoin Live Tracker All rights reserved</strong>
      </div>
    </v-footer>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
const icons = ref([
  {
    icon: 'mdi-github',
    link: 'https://github.com/ricardobezerra22'
  },
  { icon: 'mdi-linkedin', link: 'https://www.linkedin.com/in/ricardo-bezerra-22bb661a4/' }
])

const getYear = () => new Date().getFullYear()
const redirectToLink = (link) => {
  window.open(link, '_blank')
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
