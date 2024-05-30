<template>
  <div class="navbar">
    <div class="navbar-header">
      <span @click="handleHomeNavigation" class="navbar-title">{{ navTitle }}</span>
    </div>
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
