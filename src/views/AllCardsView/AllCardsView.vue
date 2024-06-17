<template>
  <Loader :loading />
  <div class="container-wrapper" v-if="!loading">
    <DefaultHeader :headers="header">
      <ItemsPerPageFilter
        :optionsView="optionsView"
        :rpp="rpp"
        @updateRpp="updateRpp"
        :results="cards.length"
      />
      <ListOfCards :cards="cards" @viewDetails="viewDetails" />
    </DefaultHeader>

    <Pagination :page="page" :pageCount="pageCount" @updatePage="updatePage" />
    <DetailedDialog
      v-model="detailedDialog"
      :loading
      :detailedCardInformation="detailedCardInformation"
      @obtainCard="handleObtainCard"
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
import { ref, onMounted, watch, reactive } from 'vue'
import { getAllCards, addCardToDeck } from '@/services/cards'
import { updateAlert } from '@/utils/alertUtils'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import ItemsPerPageFilter from '@/components/ItemsPerPageFilter/ItemsPerPageFilter.vue'
import Loader from '@/components/Loader/Loader.vue'
import ListOfCards from '@/components/ListOfCards/ListOfCards.vue'
import DetailedDialog from '@/components/DetailedDialog/DetailedDialog.vue'
import DefaultHeader from '@/components/DefaultHeader/DefaultHeader.vue'

const cards = ref([])
const page = ref(1)
const pageCount = ref(1)
const rpp = ref(10)
const loading = ref(false)
const alert = reactive({
  show: false,
  type: '',
  title: '',
  text: ''
})
const optionsView = ref([
  { title: '10', value: 10 },
  { title: '25', value: 25 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
])
const header = 'Todas as cartas'
const detailedDialog = ref(false)
const detailedCardInformation = reactive({
  name: '',
  description: '',
  imageUrl: '',
  cardId: '',
  createdAt: ''
})
const handlerAlert = (type, title, text) => {
  updateAlert(alert, { show: true, type: type, title: title, text: text })
}
const closeAlert = () => {
  alert.show = false
}
const getAll = async () => {
  try {
    loading.value = true
    const { data, headers } = await getAllCards({ rpp: rpp.value, page: page.value })
    cards.value = data.list.filter((card) => card.name && card.imageUrl).map(formatCard)
    pageCount.value = Math.ceil(headers['content-length'] / rpp.value)
  } catch (error) {
    handlerAlert('error', 'Erro ao buscar as cartas', error)
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

const updatePage = (value) => {
  page.value = value
  getAll()
}

const updateRpp = (value) => {
  rpp.value = value
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
  loading.value = true
  const payload = {
    cardIds: [detailedCardInformation.cardId]
  }
  try {
    addCardToDeck(payload)
    handlerAlert('success', 'Sucesso ao adicionar a carta', 'Carta adicionada ao seu deck!')
    detailedDialog.value = false
  } catch (error) {
    handlerAlert('error', 'Erro ao adicionar a carta', error)
  } finally {
    loading.value = false
  }
}

watch(detailedCardInformation, () => {})
onMounted(getAll)

watch(pageCount, () => {})
</script>

<style scoped lang="scss" src="./style.scss"></style>
