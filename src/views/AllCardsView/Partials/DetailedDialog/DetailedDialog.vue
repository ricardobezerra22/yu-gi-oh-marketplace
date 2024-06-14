<template>
  <v-dialog transition="dialog-bottom-transition" width="600">
    <v-card :elevation="3" class="default-dialog-card">
      <div class="dialog-content">
        <div class="dialog-image">
          <img :src="detailedCardInformation.imageUrl" :alt="detailedCardInformation.name" />
        </div>

        <div class="dialog-texts">
          <v-card-title class="headline">Detalhes</v-card-title>
          <span class="title">{{ detailedCardInformation.name }}</span>
          <span class="description">{{ detailedCardInformation.description }}</span>
        </div>

        <v-btn class="obtain-button" @click="obtainCard(detailedCardId)"> Obter </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  detailedCardInformation: {
    type: Object
  }
})

const emit = defineEmits(['obtainCard'])

const obtainCard = (card) => {
  emit('obtainCard', card)
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
