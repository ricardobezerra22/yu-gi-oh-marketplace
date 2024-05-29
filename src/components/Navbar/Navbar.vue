<template>
  <div class="navbar">
    <div class="navbar-header">
      <span>{{ navTitle }}</span>
    </div>
    <div class="navbar-search">
      <v-text-field
        label="Search..."
        append-icon="mdi mdi-magnify"
        variant="solo"
        class="search-input"
      />
    </div>
  </div>
</template>

<script setup>
const navTitle = 'Bitcoin Live Tracker'
</script>

<style lang="scss" scoped src="./style.scss"></style>
