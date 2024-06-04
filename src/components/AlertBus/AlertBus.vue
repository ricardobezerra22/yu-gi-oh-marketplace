<template>
  <div data-test-alert-bus class="alert-bus" v-if="alert">
    <v-alert data-test-alert :closable="closable" :type="type" :title="title" :text="text">
    </v-alert>
  </div>
</template>

<script setup>
defineProps({
  alert: {
    type: Boolean,
    default: false
  },
  closable: { type: Boolean, default: false },
  type: { type: String, default: '' },
  title: { type: String, default: '' },
  text: { type: String, default: '' }
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
