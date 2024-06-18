<template>
  <div class="default-btn">
    <v-btn
      :variant="variant"
      class="button"
      :disabled="isClickable"
      @click="submit"
      :append-icon="appendIcon"
      :prepend-icon="prependIcon"
      >{{ labelButton }}</v-btn
    >
  </div>
</template>

<script setup>
defineProps({
  isClickable: {
    type: Boolean,
    default: false
  },
  labelButton: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'outlined'
  },
  appendIcon: {
    type: String,
    default: null
  },
  prependIcon: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['submit'])

const submit = () => {
  emit('submit')
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
