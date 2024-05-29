<template>
  <div class="container-wrapper">
    <NavBar />
  </div>
  <!-- <div class="greeting">
    <h1>Actual price: {{ `$${value}` }}</h1>
  </div> -->
</template>
<script setup>
import { getBitcoinPrice } from '@/services/bitcoin'
import NavBar from '@/components/Navbar/Navbar.vue'
import { ref, watch, onMounted } from 'vue'

const value = ref(0)
const handleCurrency = async () => {
  const response = await getBitcoinPrice('bitcoin', 'usd')

  value.value = response.bitcoin.usd
}
watch(value, (newValue) => {
  console.log('Bitcoin price updated:', newValue)
  value.value = newValue
  // Perform any additional actions here if needed
})
onMounted(() => {
  // handleCurrency()
  // setInterval(handleCurrency, 60000)
})
</script>

<style scoped lang="scss"></style>
