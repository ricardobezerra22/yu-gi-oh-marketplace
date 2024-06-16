<template>
  <div class="filters">
    <div class="filters-items-per-page">
      <v-autocomplete
        :variant="autocompleteAttributes.variant"
        :label="autocompleteAttributes.label"
        :items="optionsView"
        :items-title="optionsView.title"
        v-model="rpp"
        @change="updateRpp"
        @update:modelValue="updateRpp"
      />
    </div>
    <div class="filters-helper">
      {{ `Mostrando ${results} resultados válidos` }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  optionsView: Array,
  rpp: Number,
  results: Number
})
const autocompleteAttributes = {
  variant: 'outlined',
  label: 'Items por página'
}
const rpp = ref(props.rpp)
const emit = defineEmits(['updateRpp'])

const updateRpp = (value) => {
  emit('updateRpp', value)
}
</script>
