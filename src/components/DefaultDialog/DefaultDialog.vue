<template>
  <v-dialog transition="dialog-bottom-transition" width="600">
    <v-card :elevation="3" class="default-dialog-card">
      <v-card-title :class="`headline`">
        <v-icon v-if="icon" :icon="icon" />{{ title }}</v-card-title
      >
      <v-card-subtitle :class="`helper-text`" v-if="subtitle">{{ subtitle }}</v-card-subtitle>
      <slot> </slot>
    </v-card>
  </v-dialog>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  icon: {
    type: String,
    default: null
  }
})
</script>
<style scoped lang="scss" src="./style.scss"></style>
