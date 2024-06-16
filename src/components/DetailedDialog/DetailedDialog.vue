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
          <div class="btn-action" v-if="isObtainable">
            <v-btn class="obtain-button" :loading="loading" @click="obtainCard(detailedCardId)">
              {{ obtainText }}
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  detailedCardInformation: {
    type: Object,
    default: () => {}
  },
  isObtainable: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['obtainCard'])
const obtainText = 'Obter'
const obtainCard = (card) => {
  emit('obtainCard', card)
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
