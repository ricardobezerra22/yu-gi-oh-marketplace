<template>
  <div class="historic-report">
    <div class="historic-report-coin">
      <div class="historic-report-coin-image">
        <v-img :src="cryptoStore.cryptoData?.image" class="currency-image"> </v-img>
      </div>
      <div class="historic-report-coin-text">
        <span>
          {{ `${cryptoStore.cryptoData?.name} (${cryptoStore.cryptoData?.symbol.toUpperCase()})` }}
        </span>
      </div>
      <div class="historic-report-coin-price">
        <v-autocomplete
          v-model="time"
          :label="'Time history'"
          :items="timeOptions"
          :item-title="(item) => item.title"
          :item-value="(item) => item.value"
          variant="outlined"
          color="primary"
          :loading="loading"
          @update:model-value="handleUpdate($event)"
        />
      </div>
    </div>

    <Charts :dataPrice="coinHistoryPrice" :categories="coinHistoryDate" />
    <AlertBus
      :closable="alertBus.closable"
      :alert="alertBus.show"
      :type="alertBus.type"
      :title="alertBus.title"
      :text="alertBus.text"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useCryptoStore } from '@/stores/coinStore'
import { getCurrencyHistory } from '@/services/coinHistory'
import Charts from '@/components/Charts/Charts.vue'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
defineProps({
  coin: {
    type: String,
    default: ''
  }
})
const alertBus = reactive({
  show: false,
  closable: true,
  type: '',
  title: '',
  text: ''
})
const cryptoStore = useCryptoStore()
const route = useRoute()
const coinHistoryDate = ref([])
const coinHistoryPrice = ref([])
const loading = ref(false)
const timeOptions = ref([
  { title: '1 day', value: 1 },
  { title: '3 days', value: 3 },
  { title: '7 days', value: 7 },
  { title: '15 days', value: 15 },
  { title: '30 days', value: 30 },
  { title: '60 days', value: 60 },
  { title: '90 days', value: 90 },
  { title: '180 days', value: 180 },
  { title: '360 days', value: 360 }
])
const time = ref(3)
const handleUpdate = (e) => {
  time.value = e
}
function formatNumber(number, decimalPlaces = 2) {
  const options = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  }
  return number.toLocaleString('pt-BR', options)
}
const hasLeadingZeroDecimals = (number) => {
  const numberString = number.toString()
  const regex = /^0\.0+[^0]/
  return regex.test(numberString)
}
const getCoinHistory = async () => {
  alertBus.show = false
  coinHistoryDate.value.length = 0
  coinHistoryPrice.value.length = 0
  try {
    const coinHistory = await getCurrencyHistory(route.params.coin.toLowerCase(), 'usd', time.value)

    coinHistory.prices.map((item) => {
      coinHistoryDate.value.push(`${new Date(item[0])}`)
      const hasDecimals = hasLeadingZeroDecimals(item[1])
      if (hasDecimals) {
        coinHistoryPrice.value.push(item[1])
      } else {
        const formattedValue = formatNumber(item[1])
        coinHistoryPrice.value.push(formattedValue)
      }
    })
  } catch (error) {
    console.log(error)
    alertBus.show = true
    alertBus.title = error.message
    alertBus.closable = true
    alertBus.type = 'error'
    if (error.code === 'ERR_NETWORK') {
      alertBus.text = 'Try again in few minutes, or just wait a bit'
    }
  }
}

watch(time, () => {
  getCoinHistory()
})
onMounted(() => {
  getCoinHistory()
  setInterval(getCoinHistory, 180000)
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
