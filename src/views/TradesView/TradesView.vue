<template>
  <div class="trade-card-container-title text-center pt-4">
    <span>Últimas trocas em andamento</span>
  </div>
  <ItemsPerPageFilter
    :optionsView="optionsView"
    :rpp="rpp"
    @updateRpp="updateRpp"
    :results="trades.length"
  />
  <Loader :loading />
  <div class="trade-card-container" v-if="!loading">
    <div class="trade-card-container-cards" v-for="(trade, index) in trades" :key="index">
      <div class="trade-card-container-cards-title text-center mb-4">
        <span
          >{{ `Troca realizada por ${trade.name}` }}
          <v-icon v-if="auth.isAuthenticated" class="pl-2">mdi mdi-delete</v-icon>
        </span>
        <br />
        <span>{{ trade.createdAt }}</span>
      </div>
      <div class="offered-cards">
        <h3>{{ `Cartas oferecidas (${trade.offeredCards.length})` }}</h3>
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

        <h3>{{ `Cartas a receber (${trade.receivedCards.length})` }}</h3>
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
</template>
<script setup>
import { compareTime } from '@/utils/dateUtils'
import { ref, reactive, onMounted, watch } from 'vue'
import { updateAlert } from '@/utils/alertUtils'
import { useAuthStore } from '@/stores/authStore'
import { getRequestedCards } from '@/services/trades'
import Loader from '@/components/Loader/Loader.vue'
import DetailedDialog from '@/components/DetailedDialog/DetailedDialog.vue'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import ItemsPerPageFilter from '@/components/ItemsPerPageFilter/ItemsPerPageFilter.vue'

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
const openDetailedDialog = (card) => {
  detailedCardInformation.name = card.name
  detailedCardInformation.description = card.description
  detailedCardInformation.imageUrl = card.imageUrl
  detailedCardInformation.cardId = card.id
  detailedCardInformation.createdAt = card.createdAt
  detailedDialog.value = true
}
const optionsView = ref([
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '25', value: 25 }
])
const page = ref(1)
const rpp = ref(10)
const trades = ref([])
const handlerAlert = (type, title, text) => {
  updateAlert(alert, { show: true, type: type, title: title, text: text })
}
const processTradeData = (tradesList) => {
  trades.value = tradesList.map(formatTrade).filter(isValidTrade)
}

const formatTrade = (trade) => {
  const offeredCards = filterCardsByType(trade.tradeCards, 'OFFERING')
  const receivedCards = filterCardsByType(trade.tradeCards, 'RECEIVING')

  if (offeredCards.length > 0 && receivedCards.length > 0) {
    return {
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

const isValidTrade = (trade) => {
  return trade !== null
}
const getRequests = async () => {
  loading.value = true
  try {
    const { data, headers } = await getRequestedCards({ rpp: rpp.value, page: page.value })
    processTradeData(data.list)
    pageCount.value = Math.ceil(headers['content-length'] / rpp.value)
  } catch (error) {
    handlerAlert('error', 'Erro ao buscar as cartas', error)
  } finally {
    loading.value = false
  }
}
const closeAlert = () => {
  alert.show = false
}
const getCardStyle = (index) => {
  const offset = index * 20
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
  getRequests()
}
const updatePage = (value) => {
  page.value = value
  getRequests()
}

onMounted(() => {
  getRequests()
})
watch(pageCount, () => {})
</script>

<style scoped lang="scss" src="./style.scss"></style>
