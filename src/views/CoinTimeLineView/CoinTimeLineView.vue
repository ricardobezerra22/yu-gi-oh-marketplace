<template>
  <div class="historic-report">
    <div class="historic-report-coin">
      <div class="historic-report-coin-image">
        <v-img
          src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
          class="currency-image"
        >
        </v-img>
      </div>
      <div class="historic-report-coin-text">
        <span>Bitcoin (BTC)</span>
      </div>
      <div class="historic-report-coin-price">
        <span>{{ `Last ${time} Days Historic` }}</span>
      </div>
    </div>

    <Charts :dataPrice="coinHistoryPrice" :categories="coinHistoryDate" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getCurrencyHistory } from '@/services/coinHistory'
import Charts from '@/components/Charts/Charts.vue'
const coinHistoryDate = ref([])
const coinHistoryPrice = ref([])
const time = ref(30)

function formatNumber(number, decimalPlaces = 2) {
  const options = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  }
  return number.toLocaleString('pt-BR', options)
}

const getCoinHistory = async (coin = 'bitcoin', currency = 'usd') => {
  try {
    const coinHistory = await getCurrencyHistory(coin, currency, time.value)
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
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
