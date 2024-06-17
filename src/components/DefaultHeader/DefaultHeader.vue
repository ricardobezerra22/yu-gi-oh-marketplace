<template>
  <div class="headers">
    <div class="headers-title">
      <h3>{{ headers }}</h3>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  headers: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
