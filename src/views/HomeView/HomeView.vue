<template>
  <div class="container-wrapper">
    <DataTable :headers="headers" :items="btcInfo" :lastUpdate="formattedDate" />
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
import { getSpecificCoinsPrice } from '@/services/bitcoin'
import { useCryptoStore } from '@/stores/coinStore'
import DataTable from '@/components/DataTable/DataTable.vue'
import AlertBus from '@/components/AlertBus/AlertBus.vue'
import { formatCurrency } from '@/utils/currencyUtils'
import { ref, onMounted, computed, watch, reactive } from 'vue'

const alertBus = reactive({
  show: false,
  closable: true,
  type: '',
  title: '',
  text: ''
})
// DataTable
const cryptoStore = useCryptoStore()
const btcInfo = ref([])
const latestUpdate = ref('')
const headers = ref([
  { title: '#', align: 'center', key: 'position' },
  {
    title: 'Name',
    align: 'center',
    key: 'name'
  },

  { title: 'Last Price', align: 'center', key: 'price', sortable: false },
  { title: '24h High', align: 'center', key: 'highestPrice', sortable: false },
  { title: '24h Low', align: 'center', key: 'lowestPrice', sortable: false },
  { title: '24h %', align: 'center', key: 'lastDay' },
  { title: 'Market Cap', align: 'center', key: 'marketCap', sortable: false },
  { title: 'Volume(24h)', align: 'center', key: 'volume', sortable: false },
  { title: 'Circulating Supply', align: 'center', key: 'supply', sortable: false }
])

function formatCryptoValue(value) {
  return formatCurrency(value, 'en-US', cryptoStore.currency.toUpperCase())
}
const handleCurrency = async () => {
  alertBus.show = false
  try {
    const response = await getSpecificCoinsPrice(cryptoStore.currency, [
      'bitcoin',
      'ethereum',
      'dacxi',
      'cosmos'
    ])

    btcInfo.value = response.map((item) => {
      latestUpdate.value = item.last_updated

      return {
        position: item.market_cap_rank,
        name: item.name,
        image: item.image,
        symbol: item.symbol,
        price: formatCryptoValue(item.current_price),
        highestPrice: formatCryptoValue(item.high_24h),
        lowestPrice: formatCryptoValue(item.low_24h),
        lastDay: `${item.price_change_percentage_24h.toFixed(2)}%`,
        marketCap: formatCryptoValue(item.market_cap),
        volume: formatCryptoValue(item.total_volume),
        supply: formatCryptoValue(item.circulating_supply)
      }
    })
  } catch (error) {
    alertBus.show = true
    alertBus.title = error.message
    alertBus.closable = true
    alertBus.type = 'error'
    if (error.code === 'ERR_NETWORK') {
      alertBus.text = 'Try again in few minutes, or just wait a bit'
    }

    console.log(error.message)
  }
}
const formattedDate = computed(() => {
  const date = new Date(latestUpdate.value)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const month = monthNames[date.getUTCMonth()]
  const day = date.getUTCDate()
  let hours = date.getUTCHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12

  return `${month} ${day}, at ${hours}:${minutes}:${seconds} ${ampm}`
})

watch(cryptoStore, () => {
  handleCurrency()
})
onMounted(() => {
  handleCurrency()
  setInterval(handleCurrency, 60000)
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
