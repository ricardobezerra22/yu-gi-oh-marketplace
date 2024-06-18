<template>
  <v-autocomplete
    v-model="model"
    :items="cards"
    item-title="name"
    class="multi-selection-input"
    chips
    multiple
    rounded
    clearable
    variant="outlined"
    item-value="id"
    :hint="hint"
    :label
    :loading
    @update:modelValue="updateValue"
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" :prepend-avatar="item.raw.imageUrl" :text="item.raw.name"></v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :prepend-avatar="item.raw.imageUrl"
        :title="item.raw.name"
        :subtitle="truncatedDescription(item.raw.description)"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  value: {
    type: Array
  },
  cards: {
    type: Array,
    required: true,
    default: () => []
  },
  hint: {
    type: String,
    default: 'Você pode escolher mais de uma'
  },
  label: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const model = ref(props.value)
const truncatedDescription = (value, maxLength = 30) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + '...'
  } else return value
}

const updateValue = (v) => {
  console.log(v)
  emit('update:modelValue', v)
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
