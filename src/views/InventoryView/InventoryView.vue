<template>
  <div class="container-wrapper">
    <Loader :loading />
    <div class="all-cards" v-if="!loading">
      <div class="all-cards-title">
        <h3>Minhas cartas</h3>
      </div>
      <div class="all-cards-filters">
        <div class="all-cards-helper">
          {{ `Mostrando ${cards.length} resultados válidos` }}
        </div>
      </div>
      <ListOfCards :cards="cards" />
    </div>
  </div>
</template>

<script setup>
import Loader from '@/components/Loader/Loader.vue'
import { ref, onMounted } from 'vue'
import { getMyCards } from '@/services/cards'
import ListOfCards from '@/components/ListOfCards/ListOfCards.vue'

const cards = ref([])
const loading = ref(false)

const getInventory = async () => {
  try {
    loading.value = true
    const { data } = await getMyCards()
    cards.value = data.cards.filter((card) => card.name && card.imageUrl).map(formatCard)
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error)
  } finally {
    loading.value = false
  }
}

const formatCard = (card) => ({
  id: card.id,
  name: card.name,
  imageUrl: card.imageUrl,
  description: card.description,
  createdAt: card.createdAt
})

onMounted(getInventory)
</script>

<style scoped lang="scss" src="./style.scss"></style>
