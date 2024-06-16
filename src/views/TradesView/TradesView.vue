<template>
  <div class="trade-card-container-title text-center pt-4">
    <span>Últimas trocas em andamento</span>
  </div>
  <div class="filters">
    <div class="filters-items-per-page">
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
      {{ `Mostrando ${trades.length} resultados válidos` }}
    </div>
    <Loader :loading />
  </div>
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
  <div class="pagination">
    <v-pagination
      rounded
      v-model="page"
      :length="pageCount"
      @update:modelValue="updatePage"
    ></v-pagination>
  </div>
</template>
<script setup>
import Loader from '@/components/Loader/Loader.vue'
import { compareTime } from '@/utils/dateUtils'
import { ref, reactive, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { getRequestedCards } from '@/services/trades'
import DetailedDialog from '@/views/AllCardsView/Partials/DetailedDialog/DetailedDialog.vue'

const detailedDialog = ref(false)
const detailedCardInformation = reactive({
  name: '',
  description: '',
  imageUrl: '',
  cardId: '',
  createdAt: ''
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
const getRequests = async () => {
  try {
    loading.value = true
    const { data, headers } = await getRequestedCards({ rpp: rpp.value, page: page.value })
    trades.value = data.list
      .map((trade) => {
        const offeredCards = trade.tradeCards.filter((item) => item.type === 'OFFERING')
        const receivedCards = trade.tradeCards.filter((item) => item.type === 'RECEIVING')

        if (offeredCards.length > 0 && receivedCards.length > 0) {
          return {
            name: trade.user.name ? trade.user.name : 'Anônimo',
            createdAt: compareTime(trade.createdAt),
            offeredCards,
            receivedCards
          }
        } else {
          return null
        }
      })
      .filter((trade) => trade !== null)
    pageCount.value = Math.ceil(headers['content-length'] / rpp.value)
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error)
  } finally {
    loading.value = false
  }
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

const updateRpp = () => {
  page.value = 1
  getRequests()
}
const updatePage = () => {
  getRequests()
}

onMounted(() => {
  getRequests()
})
watch(pageCount, () => {})
</script>

<style scoped lang="scss" src="./style.scss"></style>
