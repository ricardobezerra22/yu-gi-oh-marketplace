<template>
  <div class="navbar">
    <div class="navbar-header">
      <span @click="handleHomeNavigation" class="navbar-title">{{ navTitle }}</span>
    </div>
    <ul class="navbar-links">
      <li>
        <RouterLink to="/"><span class="navbar-links-home">Home</span></RouterLink>
      </li>
      <li>
        <RouterLink to="/tracked"
          ><span class="navbar-links-tracked">Tracked Coins</span></RouterLink
        >
      </li>
    </ul>

    <div class="navbar-dropdown-list">
      <span class="navbar-dropdown-list-title">{{ currentCurrencyTitle }}</span>
      <v-icon v-if="!isDropdownOpen" class="navbar-dropdown-list-icon" @click="toggleDropdown">{{
        icons.down
      }}</v-icon>
      <v-icon v-else class="navbar-dropdown-list-icon" @click="toggleDropdown">{{
        icons.up
      }}</v-icon>
      <v-list :class="{ 'navbar-dropdown-list-dropdown': true, visible: isDropdownOpen }">
        <v-list-item
          v-for="(data, i) in currency"
          :key="i"
          :title="data.title"
          :value="data.title"
          @click="changeValues(data)"
        ></v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCryptoStore } from '@/stores/coinStore'
const navTitle = 'Bitcoin Live Tracker'
const cryptoStore = useCryptoStore()
const currency = reactive([
  {
    title: 'USD',
    value: 'usd'
  },
  {
    title: 'EUR',
    value: 'eur'
  }
])
const icons = reactive({
  down: 'mdi-chevron-down',
  up: 'mdi-chevron-up'
})
const isDropdownOpen = ref(false)
const currentCurrencyTitle = ref('USD')
const currentCurrency = ref('usd')
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
function changeValues(data) {
  currentCurrencyTitle.value = data.title
  currentCurrency.value = data.value
  cryptoStore.setCurrency(currentCurrency.value)
  toggleDropdown()
}
const emit = defineEmits(['handleHomeNavigation'])
const handleHomeNavigation = () => {
  emit('handleHomeNavigation')
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
