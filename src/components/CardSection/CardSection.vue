<template>
  <div class="description-of-cards">
    <h3>{{ `${title} (${cards.length})` }}</h3>
    <template v-if="cards.length <= 3">
      <span v-for="(card, index) in cards" :key="index">
        {{ card.card.name }}
      </span>
    </template>
    <template v-else>
      <span v-for="(card, index) in cards.slice(0, 2)" :key="index">
        {{ card.card.name }}
      </span>
      <span>...</span>
    </template>
  </div>
  <div class="trade-card" ref="cardContainer">
    <div v-for="(card, index) in cards" :key="index" :style="getCardStyle(index)">
      <img
        :src="card.card.imageUrl"
        alt="card"
        class="trade-card-container-cards-img"
        @click="openDetailedDialog(card.card)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  cards: Array
})

const emit = defineEmits(['openDetailedDialog'])

const openDetailedDialog = (card) => {
  emit('openDetailedDialog', card)
}
const getCardStyle = (index) => {
  const offset = index * 10
  return {
    transform: `translateX(${offset}px)`,
    position: 'absolute',
    top: '-10%',
    left: '0'
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
