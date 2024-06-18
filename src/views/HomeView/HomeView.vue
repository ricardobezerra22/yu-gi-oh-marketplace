<template>
  <div class="container-wrapper">
    <div class="home-view">
      <div class="home-view-duel">
        <img src="@/assets/images/yugi-duel.png" alt="duel" />
      </div>
      <div class="home-view-greetings">
        <h1>{{ greetings }}</h1>
        <p>
          {{ infoSite }}
        </p>
        <div class="call-to-action">
          <v-btn class="cta-button btn" @click="goToExplore">{{ callToAction }}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const greetings = 'Bem-vindo ao Yu-Gi-Oh!'
const infoSite =
  'Aqui você pode explorar todas as cartas do jogo Yu-Gi-Oh!, ver trocas em andamento, e participar da comunidade para fazer suas trocas e colecionar suas cartas.'
const callToAction = 'Comece a Explorar'
const goToExplore = () => {
  router.push({ name: 'inventory' })
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
