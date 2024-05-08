<template>
  <div class="news-container">
    <div class="news-container-title">
      <h1>Headlines</h1>
    </div>
    <NewsTeaser />
  </div>
</template>
<script>
import NewsTeaser from '@/components/NewsTeaser/NewsTeaser.vue'
export default {
  name: 'MainNews',
  components: {
    NewsTeaser
  }
}
</script>

<style scoped src="./style.scss"></style>
