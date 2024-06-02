<template>
  <v-card class="tracked-coins-content-card">
    <div class="img">
      <v-img
        class="image"
        width="48"
        src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
      ></v-img>
    </div>
    <div class="text">
      <span>Bitcoin BTC</span>
    </div>
    <div class="description">
      <span>Bitcoin is a decentralized digital currency that can be stored and traded online.</span>
    </div>
    <div class="price">
      <span>Current price: $ 10,000</span>
    </div>
    <v-btn variant="outlined" rounded class="btn-redirect-chart">
      <span class="btn-icon mdi mdi-chart-line-variant"></span>
      <span class="btn-text">See detailed analysis</span>
    </v-btn>
  </v-card>
</template>

<script setup></script>

<style scoped lang="scss" src="./style.scss"></style>
