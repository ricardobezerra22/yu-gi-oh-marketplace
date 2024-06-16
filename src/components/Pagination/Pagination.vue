<template>
  <div class="pagination">
    <v-pagination
      rounded
      v-model="page"
      :length="pageCount"
      @update:modelValue="updatePage"
    ></v-pagination>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  page: Number,
  pageCount: Number
})

const emit = defineEmits(['updatePage'])
const page = ref(props.page)
const updatePage = (value) => {
  emit('updatePage', value)
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
