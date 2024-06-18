<template>
  <Loader :loading="loading" />
  <div class="container-wrapper" v-if="!loading">
    <DefaultHeader :headers="header">
      <ItemsPerPageFilter
        :optionsView="optionsView"
        :rpp="rpp"
        @updateRpp="updateRpp"
        :results="trades.length"
      />
    </DefaultHeader>
    <div class="trade-card-container">
      <div class="trade-card-container-cards" v-for="(trade, index) in trades" :key="index">
        <div class="trade-card-container-cards-title">
          <span>
            {{ `${labels.requestedBy} ${trade.name}` }}
            <v-icon
              v-if="auth.isAuthenticated && trade.userId === auth.userId"
              @click="deleteTrade(trade.id)"
              class="delete-icon pl-2"
            >
              mdi mdi-delete
            </v-icon>
          </span>
          <br />
          <span class="trade-card-container-cards-title-date">{{ trade.createdAt }}</span>
        </div>
        <div class="card-content">
          <div class="offered-cards">
            <div class="description-of-cards">
              <h3>{{ `${labels.offeredCards} (${trade.offeredCards.length})` }}</h3>
              <template v-if="trade.offeredCards.length <= 3">
                <span v-for="(card, index) in trade.offeredCards" :key="index">
                  {{ card.card.name }}
                </span>
              </template>
              <template v-else>
                <span v-for="(card, index) in trade.offeredCards.slice(0, 2)" :key="index">
                  {{ card.card.name }}
                </span>
                <span>...</span>
              </template>
            </div>
            <div class="trade-card" ref="offeredCardContainer">
              <div
                v-for="(card, index) in trade.offeredCards"
                :key="index"
                :style="getCardStyle(index)"
              >
                <img
                  :src="card.card.imageUrl"
                  alt="card"
                  class="trade-card-container-cards-img offered"
                  @click="openDetailedDialog(card.card)"
                />
              </div>
            </div>
          </div>
          <div class="received-cards">
            <hr />
            <div class="description-of-cards">
              <h3>{{ `${labels.receivedCards} (${trade.receivedCards.length})` }}</h3>
              <template v-if="trade.receivedCards.length <= 3">
                <span v-for="(card, index) in trade.receivedCards" :key="index">
                  {{ card.card.name }}
                </span>
              </template>
              <template v-else>
                <span v-for="(card, index) in trade.receivedCards.slice(0, 2)" :key="index">
                  {{ card.card.name }}
                </span>
                <span>...</span>
              </template>
            </div>
            <div class="trade-card" ref="receivedCardContainer">
              <div
                v-for="(card, index) in trade.receivedCards"
                :key="index"
                :style="getCardStyle(index)"
              >
                <img
                  :src="card.card.imageUrl"
                  alt="card"
                  class="trade-card-container-cards-img received"
                  @click="openDetailedDialog(card.card)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailedDialog
        v-model="detailedDialog"
        :detailedCardInformation="detailedCardInformation"
        :isObtainable="false"
      />
    </div>
    <Pagination :page="page" :pageCount="pageCount" @updatePage="updatePage" />
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
import { compareTime } from '@/utils/dateUtils'
import { ref, reactive, onMounted, watch } from 'vue'
import { updateAlert } from '@/utils/alertUtils'
import { useAuthStore } from '@/stores/authStore'
import { getRequestedCards, deleteTradeRequest } from '@/services/trades'
import Loader from '@/components/Loader/Loader.vue'
import DetailedDialog from '@/components/DetailedDialog/DetailedDialog.vue'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import DefaultHeader from '@/components/DefaultHeader/DefaultHeader.vue'
import ItemsPerPageFilter from '@/components/ItemsPerPageFilter/ItemsPerPageFilter.vue'

// State
const header = 'Últimas trocas em andamento'
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
const auth = useAuthStore()
const pageCount = ref(1)
const loading = ref(false)
const optionsView = ref([
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '25', value: 25 }
])
const page = ref(1)
const rpp = ref(10)
const trades = ref([])

// Labels
const labels = {
  requestedBy: 'Solicitada por',
  offeredCards: 'Cartas oferecidas',
  receivedCards: 'Cartas a receber',
  successDelete: 'Solicitação deletada',
  errorDelete: 'Erro ao deletar a troca',
  errorFetch: 'Erro ao buscar as cartas',
  unknownError: 'Erro desconhecido ao processar a solicitação'
}

// Computed properties
watch(pageCount, () => {})

// Lifecycle hooks
onMounted(() => {
  fetchTradeRequests()
})

// Functions
const openDetailedDialog = (card) => {
  Object.assign(detailedCardInformation, {
    name: card.name,
    description: card.description,
    imageUrl: card.imageUrl,
    cardId: card.id,
    createdAt: card.createdAt
  })
  detailedDialog.value = true
}

const handleAlert = (type, title, text) => {
  updateAlert(alert, { show: true, type, title, text })
}

const processTradeData = (tradesList) => {
  trades.value = tradesList.map(formatTrade).filter(Boolean)
}

const formatTrade = (trade) => {
  const offeredCards = filterCardsByType(trade.tradeCards, 'OFFERING')
  const receivedCards = filterCardsByType(trade.tradeCards, 'RECEIVING')

  if (offeredCards.length > 0 && receivedCards.length > 0) {
    return {
      id: trade.id,
      userId: trade.userId,
      name: trade.user.name || 'Anônimo',
      createdAt: compareTime(trade.createdAt),
      offeredCards,
      receivedCards
    }
  }
  return null
}

const filterCardsByType = (cards, type) => {
  return cards.filter((card) => card.type === type)
}

const deleteTrade = async (tradeId) => {
  try {
    await deleteTradeRequest(tradeId)
    handleAlert('success', labels.successDelete, false)
    resetPagination()
    fetchTradeRequests()
  } catch (error) {
    handleAlert('error', labels.errorDelete, error.message)
  }
}

const fetchTradeRequests = async () => {
  loading.value = true
  try {
    const { data, headers } = await getRequestedCards({ rpp: rpp.value, page: page.value })
    processTradeData(data.list)
    pageCount.value = Math.ceil(headers['content-length'] / rpp.value)
  } catch (error) {
    handleAlert('error', labels.errorFetch, error.message)
  } finally {
    loading.value = false
  }
}

const closeAlert = () => {
  alert.show = false
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

const updateRpp = (value) => {
  rpp.value = value
  page.value = 1
  fetchTradeRequests()
}

const updatePage = (value) => {
  page.value = value
  fetchTradeRequests()
}

const resetPagination = () => {
  rpp.value = 10
  page.value = 1
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
