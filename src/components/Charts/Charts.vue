<template>
  <div id="chart">
    <apexchart :type="type" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  dataPrice: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'line'
  },
  currency: {
    type: String,
    default: 'USD'
  }
})

const series = ref([
  {
    name: `Price in ${props.currency}`,
    data: props.dataPrice
  }
])
const chartOptions = ref({
  chart: {
    height: 350,
    id: 'realtime',
    type: props.type,
    zoom: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        month: 'MMM',
        day: 'dd',
        hour: 'HH:mm'
      }
    },

    categories: props.categories
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5,
    onItemHover: {
      highlightDataSeries: true
    }
  }
})
</script>
<style scoped src="./style.scss" lang="scss"></style>
