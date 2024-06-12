<template>
  <v-text-field
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    :append-inner-icon="icon"
    :density="density"
    :rounded="rounded"
    :variant="variant"
    required
    @update:modelValue="updateValue"
  ></v-text-field>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  rules: Array,
  icon: String,
  density: {
    type: String,
    default: 'compact'
  },
  rounded: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'outlined'
  }
})
const model = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>
