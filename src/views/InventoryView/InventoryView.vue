<template>
  <Loader :loading="loading" />
  <div class="container-wrapper" v-if="!loading">
    <DefaultHeader :headers="header">
      <DefaultButton :labelButton="requestLabels.button" @submit="openRequestDialog" />
      <div class="inventory-cards-filters">
        <div class="inventory-cards-helper text-center">
          {{ `Mostrando ${cards.length} resultados válidos` }}
        </div>
      </div>
      <ListOfCards :cards="cards" @view-details="viewDetails" />
    </DefaultHeader>
    <DefaultDialog
      v-model="requestDialog"
      :title="requestLabels.title"
      :subtitle="requestLabels.subtitle"
    >
      <MultiSelectionInput
        :value="offeringCard"
        :cards="cards"
        :label="offeringLabel"
        @update:modelValue="updateOfferCard"
      />
      <MultiSelectionInput
        :value="receivingCard"
        :cards="allCards"
        :label="receivingLabel"
        :loading
        @update:modelValue="updateReceiveCard"
      />
      <DefaultButton
        :isClickable="isValidTrade"
        :labelButton="requestLabels.button"
        @submit="handleSubmitTradeRequest"
      />
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
import { ref, onMounted, reactive, computed } from 'vue'
import { updateAlert } from '@/utils/alertUtils'
import { getMyCards, getAllCards } from '@/services/cards'
import { requestTrade } from '@/services/trades'
import Loader from '@/components/Loader/Loader.vue'
import DefaultDialog from '@/components/DefaultDialog/DefaultDialog.vue'
import DefaultButton from '@/components/DefaultButton/DefaultButton.vue'
import ListOfCards from '@/components/ListOfCards/ListOfCards.vue'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import DefaultHeader from '@/components/DefaultHeader/DefaultHeader.vue'
import DetailedDialog from '@/components/DetailedDialog/DetailedDialog.vue'
import MultiSelectionInput from './Partials/MultiSelectionInput/MultiSelectionInput.vue'

// State
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

// Labels
const requestLabels = {
  title: 'Troque cartas por outras',
  subtitle: 'Basta escolher a carta que deseja trocar e a que deseja receber',
  button: 'Solicitar troca'
}
const offeringLabel = 'Escolha a carta que deseja trocar'
const receivingLabel = 'Escolha a carta que deseja receber'

// Computed properties
const isValidTrade = computed(() => {
  return (
    offeringCard.value.length === 0 ||
    receivingCard.value.length === 0 ||
    offeringCard.value.length > receivingCard.value.length ||
    offeringCard.value.length < receivingCard.value.length
  )
})

// Lifecycle hooks
onMounted(() => {
  loadInventory()
  loadAllCards()
})

// Functions
const loadInventory = async () => {
  loading.value = true
  try {
    const { data } = await getMyCards()
    cards.value = data.cards.filter(isValidCard).map(formatCard)
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error)
  } finally {
    loading.value = false
  }
}

const loadAllCards = async () => {
  loading.value = true
  try {
    const { data } = await getAllCards({ rpp: 100, page: 1 })
    allCards.value = data.list.filter(isValidCard).map(formatCard)
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error)
  } finally {
    loading.value = false
  }
}

const isValidCard = (card) => card.name && card.imageUrl

const formatCard = (card) => ({
  id: card.id,
  name: card.name,
  imageUrl: card.imageUrl,
  description: card.description,
  createdAt: card.createdAt,
  raw: card
})

const updateOfferCard = (value) => {
  offeringCard.value = value
}

const updateReceiveCard = (value) => {
  receivingCard.value = value
}

const resetTradeValues = () => {
  requestDialog.value = false
  offeringCard.value = []
  receivingCard.value = []
}

const handleAlert = (type, title, text) => {
  updateAlert(alert, { show: true, type, title, text })
}

const handleSubmitTradeRequest = async () => {
  loading.value = true
  const offeringCards = offeringCard.value
  const receivingCards = receivingCard.value

  if (isInvalidTrade(offeringCards, receivingCards)) {
    handleAlert(
      'error',
      'Erro ao solicitar troca de cartas',
      'Você não pode trocar uma carta por ela mesma.'
    )
    loading.value = false
    return
  }

  const payload = createTradePayload(offeringCards, receivingCards)

  try {
    await requestTrade(payload)
    handleAlert('success', 'Solicitação realizada com sucesso', 'Visualize em trocas em aberto')
  } catch (error) {
    handleAlert(
      'error',
      'Erro ao solicitar troca de cartas',
      error.message || 'Erro desconhecido ao processar a solicitação.'
    )
  } finally {
    loading.value = false
    resetTradeValues()
  }
}

const isInvalidTrade = (offeringCards, receivingCards) => {
  return offeringCards.some((cardId) => receivingCards.includes(cardId))
}

const createTradePayload = (offeringCards, receivingCards) => {
  return {
    cards: [
      ...offeringCards.map((cardId) => ({ cardId, type: 'OFFERING' })),
      ...receivingCards.map((cardId) => ({ cardId, type: 'RECEIVING' }))
    ]
  }
}

const viewDetails = (card) => {
  Object.assign(detailedCardInformation, {
    name: card.name,
    description: card.description,
    imageUrl: card.imageUrl,
    cardId: card.id,
    createdAt: card.createdAt
  })
  detailedDialog.value = true
}

const closeAlert = () => {
  alert.show = false
}

const openRequestDialog = () => {
  requestDialog.value = true
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
