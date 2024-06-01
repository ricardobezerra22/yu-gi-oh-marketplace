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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getCurrencyHistory } from '@/services/coinHistory'
import Charts from '@/components/Charts/Charts.vue'
import { useRoute } from 'vue-router'
import { useCryptoStore } from '@/stores/coinStore'
defineProps({
  coin: {
    type: String,
    default: ''
  }
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
const getCoinHistory = async () => {
  coinHistoryDate.value.length = 0
  coinHistoryPrice.value.length = 0
  try {
    const coinHistory = await getCurrencyHistory(route.params.coin.toLowerCase(), 'usd', time.value)
    coinHistory.prices.map((item) => {
      coinHistoryDate.value.push(`${new Date(item[0])}`)
    })

    coinHistory.prices.forEach((item) => {
      const formattedValue = formatNumber(item[1])
      coinHistoryPrice.value.push(formattedValue)
    })
  } catch (error) {
    console.log(error)
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
