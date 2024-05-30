<template>
  <div class="data-table" data-test-data-table>
    Latest Update: {{ lastUpdate }}
    <v-data-table :hover="true" :headers="headers" :items="items" height="auto" item-value="name">
      <template v-slot:item.name="{ item }">
        <div class="item-name">
          <v-img :src="item.image" height="32"></v-img>
          {{ item.name }}
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
  }
})
const bitcoinStatus = reactive({
  highStatus: 'green',
  highStatusIcon: 'mdi-chevron-up',
  lowStatusIcon: 'mdi-chevron-down',
  lowStatus: 'red'
})
</script>

<style scoped src="./style.scss" lang="scss"></style>
