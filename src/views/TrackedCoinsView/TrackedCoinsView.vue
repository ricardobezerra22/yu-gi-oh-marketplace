<template>
  <div>
    <div class="tracked-coins">
      <div class="tracked-coins-header">
        <span>Check your favorite coins in current price here!</span>
      </div>
      <div class="tracked-coins-content">
        <v-row>
          <v-col cols="6">
            <CoinPreviewCard />
          </v-col>
          <v-col cols="6">
            <CoinPreviewCard />
          </v-col>
          <v-col cols="6">
            <CoinPreviewCard />
          </v-col>
          <v-col cols="6">
            <CoinPreviewCard />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoinPreviewCard from '@/components/CoinPreviewCard/CoinPreviewCard.vue'
</script>

<style scoped lang="scss" src="./style.scss"></style>
