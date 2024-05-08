<template>
  <div class="mobile-version" v-if="isMobile">
    <v-card :style="{ backgroundColor: presentTheme, minHeight: '60px' }">
      <v-btn variant="text" @click="toggleNavDrawer">
        <svg-icon type="mdi" :path="menu"></svg-icon>
      </v-btn>
      <div class="logo"><span>world</span><span>news</span></div>
      <v-layout>
        <v-navigation-drawer
          :mobile="true"
          v-model="drawer"
          :style="{ backgroundColor: presentTheme }"
        >
          <div class="header-of-actions">
            <div class="logo nav-drawer-bar">
              <span class="logo-world">world</span><span class="logo-news">news</span>
            </div>
            <div class="close-btn">
              <v-btn variant="text" @click="closeDrawer">
                <svg-icon type="mdi" :path="close" class="close-icon"></svg-icon>
              </v-btn>
            </div>
          </div>
          <v-list :items="items"></v-list>
        </v-navigation-drawer>
      </v-layout>

      <div class="flags-mobile">
        <NationFlags @changeLocale="handleChangeLocale" />
      </div>
    </v-card>
    <SearchInput />
  </div>
  <div class="web-version" v-if="!isMobile">
    <div class="nav-container">
      <div class="logo" :style="{ backgroundColor: presentTheme }">
        <span class="logo-world">world</span><span class="logo-news">news</span>
      </div>
      <SearchInput />
      <NationFlags @changeLocale="handleChangeLocale" />
    </div>
    <div class="second-nav" :style="{ backgroundColor: presentTheme }">
      <nav class="nav-subcontainer">
        <div class="nav-itens">
          <span
            v-for="item in items"
            :key="item"
            @mouseover="hoverItem = item.value"
            @mouseleave="hoverItem = null"
            @click="filterByArticle(item.value)"
            :class="{ hovered: hoverItem === item.value }"
            >{{ item.title }}</span
          >
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mdiMagnify, mdiAccount, mdiMenu, mdiClose } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import themes from '@/styles/scss/temp.js'
import NationFlags from '@/components/NationFlags/NationFlags.vue'
import SearchInput from '@/components/SearchInput/SearchInput.vue'

export default {
  name: 'HeaderComponent',
  components: {
    SvgIcon,
    NationFlags,
    SearchInput
  },
  data() {
    return {
      magnify: mdiMagnify,
      account: mdiAccount,
      menu: mdiMenu,
      close: mdiClose,
      drawer: false,
      items: [],
      selectedArticle: 'all',
      hoverItem: null,
      presentTheme: ''
    }
  },
  methods: {
    updateItems(locale) {
      this.items = [
        { title: this.$t('header.navItens.home', locale), value: 'home' },
        { title: this.$t('header.navItens.business', locale), value: 'business' },
        { title: this.$t('header.navItens.entertainment', locale), value: 'entertainment' },
        { title: this.$t('header.navItens.health', locale), value: 'health' },
        { title: this.$t('header.navItens.science', locale), value: 'science' },
        { title: this.$t('header.navItens.sports', locale), value: 'sports' },
        { title: this.$t('header.navItens.technology', locale), value: 'technology' }
      ]
    },
    closeDrawer() {
      this.drawer = false
    },
    toggleNavDrawer() {
      this.drawer = !this.drawer
    },
    filterByArticle(article) {
      this.selectedArticle = article
    },
    changeTheme(theme) {
      const themeMap = {
        pt: themes.pt.theme,
        us: themes.us.theme,
        br: themes.br.theme
      }

      this.presentTheme = themeMap[theme] || themes.general.black
    },
    handleChangeLocale(locale) {
      this.changeTheme(locale)
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateItems(newLocale)
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.display.xs
    }
  },
  mounted() {
    const locale = localStorage.getItem('locale')
    this.changeTheme(locale)
    this.updateItems(locale)
  }
}
</script>

<style scoped src="./style.scss"></style>
