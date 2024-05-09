<template>
  <div class="news-container">
    <div class="news-container-title">
      <h1>{{ $t('newsTeaser.headlines') }}</h1>
    </div>
    <div class="news-teaser">
      <div v-if="mainArticle" class="news-teaser-main">
        <img
          :src="mainArticle.urlToImage ? mainArticle.urlToImage : defaultImage"
          alt="Main Article"
          height="auto"
          width="400px"
          class="news-teaser-img extraneous main-article-img"
        />
        <h2 class="news-teaser-title">{{ mainArticle.category }}</h2>
        <p class="news-teaser-description">{{ mainArticle.title }}</p>
        <a :href="mainArticle.url" target="_blank" class="news-teaser-link">
          <span>{{ $t('newsTeaser.fullArticle') }} <span class="mdi mdi-open-in-new"></span></span>
        </a>
      </div>

      <div class="news-teaser-extraneous">
        <div v-for="(article, index) in additionalArticles" :key="index">
          <img
            :src="article.urlToImage ? article.urlToImage : defaultImage"
            alt="Additional Article"
            height="100px"
            class="news-teaser-img extraneous"
          />
          <h2 class="news-teaser-title">{{ article.category }}</h2>
          <p class="news-teaser-description extraneous-desc">
            {{ article.title }}
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
      defaultImage:
        'https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg',
      mainArticle: null,
      additionalArticles: []
    }
  },
  methods: {
    async fetchTopHeadlines() {
      const verifyUrl = (data, findData) => {
        if (!data) {
          data = findData.find((article) => article?.title)
        }
      }

      try {
        const locale = localStorage.getItem('locale')

        // Shuffle categories
        this.shuffleArray(this.categories)

        // Fetch main article
        const mainCategory = this.categories[0]
        const mainResponse = await getTopHeadlines(locale, mainCategory)
        const mainArticlesData = mainResponse.data.articles

        // Find the first article with valid title
        let validMainArticleData = mainArticlesData.find((article) => article.title !== '[Removed]')

        verifyUrl(validMainArticleData, mainArticlesData)

        this.mainArticle = {
          category: mainCategory.toUpperCase(),
          title: validMainArticleData.title,
          url: validMainArticleData.url,
          urlToImage: validMainArticleData.urlToImage
        }

        // Fetch additional articles
        const additionalCategories = this.categories.slice(1, 3)
        const additionalResponses = await Promise.all(
          additionalCategories.map(async (category) => {
            const response = await getTopHeadlines(locale, category)
            const articlesData = response.data.articles
            let validArticleData = articlesData.find((article) => article.title !== '[Removed]')

            verifyUrl(validArticleData, articlesData)

            return {
              category: category.toUpperCase(),
              title: validArticleData.title,
              url: validArticleData.url,
              urlToImage: validArticleData.urlToImage
            }
          })
        )

        // Filter out main article from additional articles
        const mainArticleUrl = validMainArticleData.url
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
        const randomized = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[randomized]
        array[randomized] = temp
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
