<template>
  <div class="text-end">
    <v-chip data-test-chip :color="color" size="small" outlined>
      <span id="chip-description" data-test-chip-description v-if="description">{{
        description
      }}</span>
      <v-icon data-test-chip-icon :icon="icon" />
    </v-chip>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<style scoped src="./style.scss" lang="scss"></style>
