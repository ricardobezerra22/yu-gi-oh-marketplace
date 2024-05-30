<template>
  <div class="text-end">
    <v-chip :color="color" :text="text" size="small" outlined>
      <span v-if="description"> {{ description }}</span>
      <v-icon :icon="icon" />
    </v-chip>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: ''
  },
  text: {
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
