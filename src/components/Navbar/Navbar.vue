<template>
  <div class="navbar xs">
    <div class="logo-img">
      <img src="@/assets/images/logo.png" alt="logo" />
    </div>
    <div class="menu-items">
      <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" class="menu-items-icon">mdi-menu</v-icon>
        </template>
        <v-card min-width="300" theme="dark">
          <v-list>
            <v-list-item
              prepend-icon="mdi mdi-account"
              :title="username || 'Anônimo'"
              :subtitle="userEmail"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              class="list-item-title"
              @click="handleNavigation(item.path, item.action)"
            >
              {{ item.title }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
  <div class="navbar md">
    <div class="logo-img">
      <img src="@/assets/images/logo.png" alt="logo" width="128px" />
    </div>
    <div
      class="menu-items"
      v-for="(item, i) in menuItems"
      :key="i"
      @click="handleNavigation(item.path, item.action)"
    >
      <span class="list-item-title"> {{ item.title }} </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const router = useRouter()
defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  userEmail: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  }
})
const menu = ref(false)

const handleNavigation = (path, action) => {
  if (action === 'logout') {
    logout()
  }
  if (!path) return

  router.push({ name: path })
}

const unauthenticatedUser = () => {
  authStore.clearUserData()
  router.push({ name: 'home' })
}
const logout = () => {
  unauthenticatedUser()
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
