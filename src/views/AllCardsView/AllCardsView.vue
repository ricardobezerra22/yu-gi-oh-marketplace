<template>
  <div class="container-wrapper">
    <Loader :loading />
    <div class="all-cards" v-if="!loading">
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
          {{ `Mostrando ${cards.length} resultados válidos` }}
        </div>
      </div>
      <ListOfCards :cards="cards" @viewDetails="viewDetails" />

      <div class="all-cards-pagination">
        <v-pagination
          rounded
          v-model="page"
          :length="pageCount"
          @update:modelValue="updatePage"
        ></v-pagination>
      </div>
    </div>

    <DetailedDialog
      v-model="detailedDialog"
      :detailedCardInformation="detailedCardInformation"
      @obtainCard="handleObtainCard"
    />
  </div>
</template>

<script setup>
import Loader from '@/components/Loader/Loader.vue'
import { ref, onMounted, watch, reactive } from 'vue'
import { getAllCards, addCardToDeck } from '@/services/cards'
import ListOfCards from '@/components/ListOfCards/ListOfCards.vue'
import DetailedDialog from './Partials/DetailedDialog/DetailedDialog.vue'

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
const detailedCardInformation = reactive({
  name: '',
  description: '',
  imageUrl: '',
  cardId: '',
  createdAt: ''
})

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
  detailedCardInformation.name = card.name
  detailedCardInformation.description = card.description
  detailedCardInformation.imageUrl = card.imageUrl
  detailedCardInformation.cardId = card.id
  detailedCardInformation.createdAt = card.createdAt
  detailedDialog.value = true
}

const handleObtainCard = () => {
  const payload = {
    cardIds: [detailedCardInformation.cardId]
  }
  try {
    addCardToDeck(payload)
  } catch (error) {
    console.error('Erro ao adicionar a carta:', error)
  }
}

watch(detailedCardInformation, () => {})
onMounted(getAll)

watch(pageCount, () => {})
</script>

<style scoped lang="scss" src="./style.scss"></style>
