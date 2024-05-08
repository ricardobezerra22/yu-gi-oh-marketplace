<template>
  <div class="news-container">
    <div class="news-container-title">
      <h1>{{ $t('newsTeaser.headlines') }}</h1>
    </div>
    <div class="news-teaser">
      <div v-if="mainArticle" class="news-teaser-main">
        <img
          :src="mainArticle.urlToImage"
          alt="Main Article"
          height="auto"
          width="400px"
          class="news-teaser-img extraneous"
        />
        <h2 class="news-teaser-title">{{ mainArticle.title }}</h2>
        <p class="news-teaser-description">{{ mainArticle.description }}</p>
        <a :href="mainArticle.url" target="_blank" class="news-teaser-link">
          <span>{{ $t('newsTeaser.fullArticle') }} <span class="mdi mdi-open-in-new"></span></span>
        </a>
      </div>

      <div class="news-teaser-extraneous">
        <div v-for="(article, index) in additionalArticles" :key="index">
          <img
            :src="article.urlToImage"
            alt="Additional Article"
            height="100px"
            class="news-teaser-img extraneous"
          />
          <h2 class="news-teaser-title">{{ article.title }}</h2>
          <p class="news-teaser-description extraneous-desc">
            {{ truncatedDescription(article.description) }}
          </p>
          <a :href="article.url" target="_blank" class="news-teaser-link">
            <span class="news-teaser-link-article"
              >{{ $t('newsTeaser.fullArticle') }} <span class="mdi mdi-open-in-new"></span
            ></span>
          </a>
        </div>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
import { getTopHeadlines } from '@/services/topHeaders/index.js'

export default {
  name: 'MainNews',
  data() {
    return {
      articles: [],
      categories: [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology'
      ],
      mainArticle: null,
      additionalArticles: []
    }
  },
  methods: {
    truncatedDescription(value, maxLength = 88) {
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + '...'
      } else return value
    },
    async fetchTopHeadlines() {
      try {
        const locale = localStorage.getItem('locale')

        // Shuffle categories
        this.shuffleArray(this.categories)

        // Fetch main article
        const mainCategory = this.categories[0]
        const mainResponse = await getTopHeadlines(locale, mainCategory)
        const mainArticlesData = mainResponse.data.articles
        this.shuffleArray(mainArticlesData)
        const mainArticleData = mainArticlesData[0]
        this.mainArticle = {
          title: mainCategory.toUpperCase(),
          description: mainArticleData.description,
          url: mainArticleData.url,
          urlToImage: mainArticleData.urlToImage
        }

        // Fetch additional articles
        const additionalCategories = this.categories.slice(1, 3)
        const additionalResponses = await Promise.all(
          additionalCategories.map(async (category) => {
            const response = await getTopHeadlines(locale, category)
            const articlesData = response.data.articles
            this.shuffleArray(articlesData)
            const articleData = articlesData[0]
            return {
              title: category.toUpperCase(),
              description: articleData.description,
              url: articleData.url,
              urlToImage: articleData.urlToImage
            }
          })
        )

        // Filter out main article from additional articles
        const mainArticleUrl = mainArticleData.url
        this.additionalArticles = additionalResponses.filter(
          (article) => article.url !== mainArticleUrl
        )
      } catch (error) {
        console.error('Error fetching headlines:', error)
      }
    },

    shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  },
  watch: {
    locale(newLocale, oldLocale) {
      if (newLocale !== oldLocale) {
        this.fetchTopHeadlines()
      }
    }
  },
  mounted() {
    this.fetchTopHeadlines()
  }
}
</script>

<style scoped src="./style.scss"></style>
