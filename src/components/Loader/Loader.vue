<template>
  <div class="loader" v-if="loading">
    <div class="text-center">
      <v-progress-circular color="$vuetify" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
