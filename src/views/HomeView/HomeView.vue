<template>
  <div class="container-wrapper">
    <DataTable :headers="headers" :items="btcInfo" :lastUpdate="formattedDate" />
  </div>
</template>
<script setup>
import { getCoinPrice } from '@/services/bitcoin'
import DataTable from '@/components/DataTable/DataTable.vue'
import { formatCurrency } from '@/utils/currencyUtils'
import { ref, onMounted, computed } from 'vue'

// DataTable
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
const handleCurrency = async () => {
  const response = await getCoinPrice('usd')
  btcInfo.value = response.map((item) => {
    latestUpdate.value = item.last_updated

    return {
      position: item.market_cap_rank,
      name: item.name,
      image: item.image,
      symbol: item.symbol,
      price: formatCurrency(item.current_price),
      highestPrice: formatCurrency(item.high_24h),
      lowestPrice: formatCurrency(item.low_24h),
      lastDay: `${item.price_change_percentage_24h.toFixed(2)}%`,
      marketCap: formatCurrency(item.market_cap),
      volume: formatCurrency(item.total_volume),
      supply: formatCurrency(item.circulating_supply)
    }
  })
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

onMounted(() => {
  handleCurrency()
  setInterval(handleCurrency, 60000)
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
