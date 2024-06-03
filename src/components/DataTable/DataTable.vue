<template>
  <div class="data-table" data-test-data-table>
    <span class="data-table-last-update-helper"> Latest Update: {{ lastUpdate }} UTC</span>

    <v-data-table
      :loading="loading"
      :hover="true"
      :headers="headers"
      :items="items"
      height="auto"
      item-value="name"
    >
      <template v-slot:item.name="{ item }">
        <div class="item-name" @click="sendToDetailedPage(item.name, item.symbol, item.image)">
          <v-img :src="item.image" height="32" class="currency-image"></v-img>
          <v-tooltip :text="item.name">
            <template v-slot:activator="{ props }">
              <span v-bind="props" class="coin-name">{{ truncatedDescription(item.name) }}</span>
            </template>
          </v-tooltip>
        </div>
      </template>
      <template v-slot:item.lastDay="{ item }">
        <Chip
          :color="item.lastDay > 0 ? bitcoinStatus.highStatus : bitcoinStatus.lowStatus"
          :text="item.lastDay"
          :description="item.lastDay"
          :icon="item.lastDay > 0 ? bitcoinStatus.highStatusIcon : bitcoinStatus.lowStatusIcon"
        />
      </template>
      <template v-slot:item.highestPrice="{ item }">
        <Chip
          :color="'green'"
          :text="item.highestPrice"
          :description="item.highestPrice"
          :icon="'mdi-chevron-up'"
        />
      </template>
      <template v-slot:item.lowestPrice="{ item }">
        <Chip
          :color="bitcoinStatus.lowStatus"
          :text="item.lowestPrice"
          :description="item.lowestPrice"
          :icon="bitcoinStatus.lowStatusIcon"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import Chip from '@/components/Chip/Chip.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCryptoStore } from '@/stores/coinStore'
const router = useRouter()
defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  lastUpdate: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const truncatedDescription = (value, maxLength = 10) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + '...'
  } else return value
}
const cryptoStore = useCryptoStore()
function extractFirstName(name) {
  if (name.includes(' ')) {
    const nameParts = name.split(' ')
    return nameParts[0].toLowerCase()
  } else {
    return name.toLowerCase()
  }
}

const sendToDetailedPage = (name, symbol, image) => {
  console.log(name)
  cryptoStore.setCryptoData({ name, symbol, image })
  router.push(`/coin/${extractFirstName(name)}`)
}
const bitcoinStatus = reactive({
  highStatus: 'green',
  highStatusIcon: 'mdi-chevron-up',
  lowStatusIcon: 'mdi-chevron-down',
  lowStatus: 'red'
})
</script>

<style scoped src="./style.scss" lang="scss"></style>
