<template>
  <div class="news-teaser">
    <div class="news-teaser-main">
      <img
        src="https://s.yimg.com/ny/api/res/1.2/0rGG29qMZPs_c4TNvbIW1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTM-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/635d6000-0bd8-11ef-ab7d-561ac0d48987"
        alt="science"
        height="auto"
        width="400px"
        class="news-teaser-img extraneous"
      />
      <h2 class="news-teaser-title">Science</h2>
      <p class="news-teaser-description">
        James Webb: A $10bn machine in search of the end of darkness
      </p>
      <router-link :to="articleLink" class="news-teaser-link"
        ><span>{{ $t('newsTeaser.fullArticle') }} <span class="mdi mdi-open-in-new"></span></span
      ></router-link>
    </div>

    <div class="news-teaser-extraneous">
      <img
        src="https://s.yimg.com/ny/api/res/1.2/0rGG29qMZPs_c4TNvbIW1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTM-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/635d6000-0bd8-11ef-ab7d-561ac0d48987"
        alt="science"
        height="100px"
        class="news-teaser-img extraneous"
      />
      <h2 class="news-teaser-title">Science</h2>
      <p class="news-teaser-description extraneous-desc">
        James Webb: A $10bn machine in search of the end of darkness
      </p>
      <router-link :to="articleLink" class="news-teaser-link"
        ><span>{{ $t('newsTeaser.fullArticle') }} <span class="mdi mdi-open-in-new"></span></span
      ></router-link>
      <img
        src="https://s.yimg.com/ny/api/res/1.2/0rGG29qMZPs_c4TNvbIW1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTM-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/635d6000-0bd8-11ef-ab7d-561ac0d48987"
        alt="science"
        height="100px"
        class="news-teaser-img"
      />
      <h2 class="news-teaser-title">Science</h2>
      <p class="news-teaser-description extraneous-desc">
        James Webb: A $10bn machine in search of the end of darkness
      </p>
      <router-link :to="articleLink" class="news-teaser-link"
        ><span>{{ $t('newsTeaser.fullArticle') }} <span class="mdi mdi-open-in-new"></span></span
      ></router-link>
    </div>
  </div>
  <div class="border"></div>
</template>

<script>
export default {
  name: 'NewsTeaser',
  //   props: {
  //     articleName: { type: String },
  //     description: { type: String },
  //     articleLink: { type: String },
  //     urlToImage: { type: String }
  //   },
  data() {
    return {
      articles: [
        {
          title: 'Science',
          description: 'James Webb: A $10bn machine in search of the end of darkness',
          fullArticle:
            'https://finance.yahoo.com/news/lucid-stock-down-on-q1-loss-confirms-gravity-suv-on-track-for-late-2024-launch-201602645.html',
          urlToImage:
            'https://s.yimg.com/ny/api/res/1.2/0rGG29qMZPs_c4TNvbIW1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTM-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/635d6000-0bd8-11ef-ab7d-561ac0d48987'
        },
        {
          title: 'Science',
          description: 'James Webb: A $10bn machine in search of the end of darkness',
          fullArticle:
            'https://finance.yahoo.com/news/lucid-stock-down-on-q1-loss-confirms-gravity-suv-on-track-for-late-2024-launch-201602645.html',
          urlToImage:
            'https://s.yimg.com/ny/api/res/1.2/0rGG29qMZPs_c4TNvbIW1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTM-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/635d6000-0bd8-11ef-ab7d-561ac0d48987'
        },
        {
          title: 'Science',
          description: 'James Webb: A $10bn machine in search of the end of darkness',
          fullArticle:
            'https://finance.yahoo.com/news/lucid-stock-down-on-q1-loss-confirms-gravity-suv-on-track-for-late-2024-launch-201602645.html',
          urlToImage:
            'https://s.yimg.com/ny/api/res/1.2/0rGG29qMZPs_c4TNvbIW1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTM-/https://s.yimg.com/os/creatr-uploaded-images/2024-05/635d6000-0bd8-11ef-ab7d-561ac0d48987'
        }
      ]
    }
  }
}
</script>

<style scoped src="./style.scss"></style>
