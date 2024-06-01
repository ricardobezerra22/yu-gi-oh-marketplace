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
    <div class="navbar-search">
      <v-text-field
        class="search-input"
        label="Search..."
        append-inner-icon="mdi mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      />
    </div>
  </div>
</template>

<script setup>
const navTitle = 'Bitcoin Live Tracker'

const emit = defineEmits(['handleHomeNavigation'])
const handleHomeNavigation = () => {
  emit('handleHomeNavigation')
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
