<template>
  <div class="container-wrapper">
    <Loader :loading="loading" />
    <div class="inventory-cards" v-if="!loading">
      <div class="inventory-cards-title">
        <h3>Minhas cartas</h3>
      </div>
      <div class="inventory-cards-request-trade">
        <v-btn variant="outlined" class="btn" @click="openRequestDialog">Solicitar troca</v-btn>
      </div>
      <div class="inventory-cards-filters">
        <div class="inventory-cards-helper">
          {{ `Mostrando ${cards.length} resultados válidos` }}
        </div>
      </div>
      <ListOfCards :cards="cards" @view-details="viewDetails" />
    </div>
    <DefaultDialog
      v-model="requestDialog"
      :title="'Troque cartas por outras'"
      :subtitle="'Basta você escolher a carta que deseja trocar e a que deseja receber'"
    >
      <v-autocomplete
        v-model="offeringCard"
        :items="cards"
        item-title="name"
        chips
        multiple
        clearable
        variant="outlined"
        item-value="id"
        :hint="'Você pode escolher mais de uma'"
        label="Escolha a carta que deseja trocar"
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
      <v-autocomplete
        v-model="receivingCard"
        :items="allCards"
        multiple
        clearable
        variant="outlined"
        item-title="name"
        :hint="'Você pode escolher mais de uma'"
        item-value="id"
        label="Escolha a carta que deseja Receber"
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
      <div class="request-dialog-submit-btn">
        <v-btn variant="outlined" @click="handleSubmitTradeRequest">{{ 'Solicitar troca' }}</v-btn>
      </div>
    </DefaultDialog>
    <DetailedDialog
      v-model="detailedDialog"
      :loading
      :detailedCardInformation="detailedCardInformation"
      :isObtainable="false"
    />
  </div>
</template>

<script setup>
import DefaultDialog from '@/components/DefaultDialog/DefaultDialog.vue'
import Loader from '@/components/Loader/Loader.vue'
import { ref, onMounted, reactive } from 'vue'
import { getMyCards, getAllCards } from '@/services/cards'
import { requestTrade } from '@/services/trades'
import ListOfCards from '@/components/ListOfCards/ListOfCards.vue'

import DetailedDialog from '@/components/DetailedDialog/DetailedDialog.vue'

const cards = ref([])
const allCards = ref([])
const loading = ref(false)
const offeringCard = ref([])
const receivingCard = ref([])
const requestDialog = ref(false)
const detailedDialog = ref(false)
const detailedCardInformation = reactive({
  name: '',
  description: '',
  imageUrl: '',
  cardId: '',
  createdAt: ''
})
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

const getAll = async () => {
  try {
    loading.value = true
    const { data } = await getAllCards({ rpp: 100, page: 1 })
    allCards.value = data.list.filter((card) => card.name && card.imageUrl).map(formatCard)
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error)
  } finally {
    loading.value = false
  }
}

const truncatedDescription = (value, maxLength = 30) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + '...'
  } else return value
}

const handleSubmitTradeRequest = () => {
  const payload = {
    cards: [
      ...offeringCard.value.map((cardId) => ({ cardId, type: 'OFFERING' })),
      ...receivingCard.value.map((cardId) => ({ cardId, type: 'RECEIVING' }))
    ]
  }
  try {
    requestTrade(payload)
  } catch (error) {
    console.error('Erro ao solicitar troca:', error)
  }
}
const viewDetails = (card) => {
  detailedCardInformation.name = card.name
  detailedCardInformation.description = card.description
  detailedCardInformation.imageUrl = card.imageUrl
  detailedCardInformation.cardId = card.id
  detailedCardInformation.createdAt = card.createdAt
  detailedDialog.value = true
}

const formatCard = (card) => ({
  id: card.id,
  name: card.name,
  imageUrl: card.imageUrl,
  description: card.description,
  createdAt: card.createdAt,
  raw: card
})

const openRequestDialog = () => {
  getAll()
  requestDialog.value = true
}

onMounted(getInventory)
</script>

<style scoped lang="scss" src="./style.scss"></style>
