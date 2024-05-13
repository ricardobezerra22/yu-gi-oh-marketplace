<template>
  <div class="latest-news">
    <h1 class="latest-news-title">Latest News</h1>
    <div class="articles-container">
      <div class="latest-news-articles" v-for="item in items" :key="item">
        <div class="latest-news-articles-img">
          <img
            src="https://s.yimg.com/ny/api/res/1.2/stnTpsmzsbjRh48UXKCM9A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/377b2ea0-0fe2-11ef-bffe-ce81c00cf140"
            alt="Main Article"
          />
        </div>
        <div class="latest-news-articles-description">
          <span class="latest-news-articles-category">{{ item.category }}</span>
          <span class="latest-news-articles-articles">{{ item.title }}</span>
          <span class="latest-news-articles-link">{{ item.link }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LatestNews',
  data() {
    return {
      items: [
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        },
        {
          category: 'Science',
          title: 'Brazil wildfires killed an estimated 17 million animals',
          link: 'Read Full Article'
        }
      ]
    }
  }
}
</script>

<style scoped src="./style.scss"></style>
