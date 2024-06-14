<template>
  <v-dialog transition="dialog-bottom-transition" width="600">
    <v-card :elevation="3" class="default-dialog-card">
      <div class="dialog-content">
        <div class="dialog-image">
          <img :src="detailedImageUrl" :alt="detailedName" />
        </div>

        <div class="dialog-texts">
          <v-card-title class="headline">Detalhes</v-card-title>
          <span class="title">{{ detailedName }}</span>
          <span class="description">{{ detailedDescription }}</span>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  detailedImageUrl: {
    type: String
  },
  detailedName: {
    type: String
  },
  detailedDescription: {
    type: String
  }
})
</script>

<style scoped lang="scss" src="./style.scss"></style>
