<template>
  <div class="container-wrapper">
    <Loader :loading="loading" />
    <DefaultHeader :headers="header" v-if="!loading">
      <div class="inventory-cards-request-trade">
        <v-btn variant="outlined" class="btn" @click="openRequestDialog">Solicitar troca</v-btn>
      </div>
      <div class="inventory-cards-filters">
        <div class="inventory-cards-helper text-center">
          {{ `Mostrando ${cards.length} resultados válidos` }}
        </div>
      </div>
      <ListOfCards :cards="cards" @view-details="viewDetails" />
    </DefaultHeader>
    <DefaultDialog
      v-model="requestDialog"
      :title="'Troque cartas por outras'"
      :subtitle="'Basta você escolher a carta que deseja trocar e a que deseja receber'"
    >
      <v-autocomplete
        v-model="offeringCard"
        :items="cards"
        item-title="name"
        class="offering-card"
        chips
        multiple
        rounded
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
        rounded
        clearable
        class="receiving-card"
        variant="outlined"
        item-title="name"
        :hint="'Você pode escolher mais de uma'"
        item-value="id"
        label="Escolha a carta que deseja Receber"
        :loading
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
        <v-btn
          variant="outlined"
          class="btn"
          :disabled="isValidTrade"
          @click="handleSubmitTradeRequest"
          >{{ 'Solicitar troca' }}</v-btn
        >
      </div>
    </DefaultDialog>
    <DetailedDialog
      v-model="detailedDialog"
      :loading
      :detailedCardInformation="detailedCardInformation"
      :isObtainable="false"
    />
    <AlertBus
      :title="alert.title"
      :text="alert.text"
      :type="alert.type"
      :alert="alert.show"
      @closeAlert="closeAlert"
    />
  </div>
</template>

<script setup>
import DefaultDialog from '@/components/DefaultDialog/DefaultDialog.vue'
import Loader from '@/components/Loader/Loader.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { updateAlert } from '@/utils/alertUtils'
import { getMyCards, getAllCards } from '@/services/cards'
import { requestTrade } from '@/services/trades'
import ListOfCards from '@/components/ListOfCards/ListOfCards.vue'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import DefaultHeader from '@/components/DefaultHeader/DefaultHeader.vue'
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
const alert = reactive({
  show: false,
  type: '',
  title: '',
  text: ''
})
const header = 'Minhas cartas'
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

const resetValues = () => {
  requestDialog.value = false
  offeringCard.value = []
  receivingCard.value = []
}
const handlerAlert = (type, title, text) => {
  updateAlert(alert, { show: true, type: type, title: title, text: text })
}
const handleSubmitTradeRequest = async () => {
  loading.value = true

  const offeringCards = offeringCard.value
  const receivingCards = receivingCard.value

  const isInvalidTrade = offeringCards.some((cardId) => receivingCards.includes(cardId))

  if (isInvalidTrade) {
    handlerAlert(
      'error',
      'Erro ao solicitar troca de cartas',
      'Você não pode trocar uma carta por ela mesma.'
    )
    loading.value = false
    return
  }

  const payload = {
    cards: [
      ...offeringCards.map((cardId) => ({ cardId, type: 'OFFERING' })),
      ...receivingCards.map((cardId) => ({ cardId, type: 'RECEIVING' }))
    ]
  }

  try {
    await requestTrade(payload)
    handlerAlert('success', 'Solicitação realizada com sucesso', 'Visualize em trocas em aberto')
  } catch (error) {
    handlerAlert(
      'error',
      'Erro ao solicitar troca de cartas',
      error.message || 'Erro desconhecido ao processar a solicitação.'
    )
  } finally {
    loading.value = false
    resetValues()
  }
}
const isValidTrade = computed(() => {
  return (
    offeringCard.value.length === 0 ||
    receivingCard.value.length === 0 ||
    offeringCard.value.length > receivingCard.value.length ||
    offeringCard.value.length < receivingCard.value.length
  )
})
const viewDetails = (card) => {
  detailedCardInformation.name = card.name
  detailedCardInformation.description = card.description
  detailedCardInformation.imageUrl = card.imageUrl
  detailedCardInformation.cardId = card.id
  detailedCardInformation.createdAt = card.createdAt
  detailedDialog.value = true
}
const closeAlert = () => {
  alert.show = false
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
