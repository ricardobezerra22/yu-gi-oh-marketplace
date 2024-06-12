<template>
  <div class="container-wrapper">
    <div class="loader" v-if="loading">
      <div class="text-center">
        <v-progress-circular color="$vuetify" indeterminate></v-progress-circular>
      </div>
    </div>
    <div class="all-cards" v-else>
      <div class="all-cards-title">
        <h3>Todas as cartas</h3>
      </div>
      <div class="all-cards-filters">
        <div class="all-cards-filters-items-per-page">
          <v-autocomplete
            variant="outlined"
            label="Items por página"
            :items="optionsView"
            :items-title="optionsView.title"
            v-model="rpp"
            @change="updateRpp"
            @update:modelValue="updateRpp"
          />
        </div>
        <div class="all-cards-helper">
          {{ `Mostrando ${cards.length} resultados` }}
        </div>
      </div>
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

      <div class="all-cards-pagination">
        <v-pagination
          rounded
          v-model="page"
          :length="pageCount"
          @update:modelValue="updatePage"
        ></v-pagination>
      </div>
    </div>

    <v-dialog v-model="detailedDialog" transition="dialog-bottom-transition" width="600">
      <v-card :elevation="3" class="default-dialog-card">
        <div class="dialog-content">
          <div class="dialog-image">
            <img :src="detailedImageUrl" :alt="detailedName" />
          </div>

          <div class="dialog-texts">
            <v-card-title class="headline">Detalhes</v-card-title>
            <span class="title">{{ detailedName }}</span>
            <span class="description">{{ detailedDescription }}</span>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getAllCards } from '@/services/cards'

const cards = ref([])
const page = ref(1)
const pageCount = ref(1)
const rpp = ref(10)
const loading = ref(false)
const optionsView = ref([
  { title: '10', value: 10 },
  { title: '25', value: 25 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
])
const detailedDialog = ref(false)
const detailedName = ref('')
const detailedDescription = ref('')
const detailedImageUrl = ref('')

const getAll = async () => {
  try {
    loading.value = true
    const { data, headers } = await getAllCards({ rpp: rpp.value, page: page.value })
    cards.value = data.list.filter((card) => card.name && card.imageUrl).map(formatCard)
    pageCount.value = Math.ceil(headers['content-length'] / rpp.value)
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

const updatePage = () => {
  getAll()
}

const updateRpp = () => {
  page.value = 1
  getAll()
}

const viewDetails = (card) => {
  detailedDialog.value = true
  detailedName.value = card.name
  detailedDescription.value = card.description
  detailedImageUrl.value = card.imageUrl
}

onMounted(getAll)

watch(pageCount, () => {})
</script>

<style scoped lang="scss" src="./style.scss"></style>
