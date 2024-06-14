<template>
  <div class="all-cards-content">
    <div
      class="all-cards-content-card"
      v-for="card in cards"
      :key="card.id"
      @click="viewDetails(card)"
    >
      <div class="all-cards-content-card-img">
        <img :src="card.imageUrl" :alt="card.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['viewDetails'])

const viewDetails = (card) => {
  emit('viewDetails', card)
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
