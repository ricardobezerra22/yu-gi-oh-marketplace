<template>
  <div class="container-wrapper">
    <div class="navbar" v-if="!isMobile">
      <div class="logo-img">
        <img src="@/assets/images/logo.png" alt="logo" width="128px" />
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
                title="Example"
                subtitle="example@gmail.com"
              >
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item v-for="(item, i) in menuItems" :key="i" class="list-item-title">
                {{ item.title }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
    <div class="navbar md" v-else>
      <div class="logo-img">
        <img src="@/assets/images/logo.png" alt="logo" width="128px" />
      </div>
      <div class="menu-items" v-for="(item, i) in menuItems" :key="i">
        <span class="list-item-title"> {{ item.title }} </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const menu = ref(false)
const isMobile = ref(true)
const menuItems = ref([
  { title: 'Home', value: 'home' },
  { title: 'Todas As Cartas', value: 'all-cards' },
  { title: 'Trocas em aberto', value: 'open-trades' },
  { title: 'Inventário', value: 'inventory' },
  { title: 'Login', value: 'login' },
  { title: 'Sair', value: 'logout' }
])
</script>

<style scoped lang="scss" src="./style.scss"></style>
