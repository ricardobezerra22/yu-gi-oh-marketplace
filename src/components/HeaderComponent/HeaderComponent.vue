<template>
  <div class="mobile-version" v-if="this.$vuetify.display.xs">
    <v-card :style="{ backgroundColor: presentTheme }">
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

      <div class="flags flags-mobile">
        <img
          v-if="this.$i18n.locale !== 'pt'"
          src="@/assets/images/flags/portugal.png"
          alt="portugal"
          width="35"
          @click="handleChangeLocale('pt')"
        />
        <img
          v-if="this.$i18n.locale !== 'en'"
          src="@/assets/images/flags/usa.png"
          alt="usa"
          width="35"
          @click="handleChangeLocale('en')"
        />
        <img
          v-if="this.$i18n.locale !== 'br'"
          src="@/assets/images/flags/brazil.png"
          alt="brazil"
          width="35"
          @click="handleChangeLocale('br')"
        />
      </div>
    </v-card>
  </div>
  <div class="web-version" v-if="!this.$vuetify.display.xs">
    <div class="nav-container">
      <div class="logo" :style="{ backgroundColor: presentTheme }">
        <span class="logo-world">world</span><span class="logo-news">news</span>
      </div>
      <div class="search-input">
        <v-text-field
          :label="$t('search.placeholder')"
          variant="outlined"
          class="search"
          height="20"
        >
          <template v-slot:append-inner>
            <svg-icon type="mdi" :path="magnify"></svg-icon>
          </template>
        </v-text-field>
      </div>
      <div class="flags">
        <img
          v-if="this.$i18n.locale !== 'pt'"
          src="@/assets/images/flags/portugal.png"
          alt="portugal"
          width="35"
          @click="handleChangeLocale('pt')"
        />
        <img
          v-if="this.$i18n.locale !== 'en'"
          src="@/assets/images/flags/usa.png"
          alt="usa"
          width="35"
          @click="handleChangeLocale('en')"
        />
        <img
          v-if="this.$i18n.locale !== 'br'"
          src="@/assets/images/flags/brazil.png"
          alt="brazil"
          width="35"
          @click="handleChangeLocale('br')"
        />
      </div>
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
import SvgIcon from '@jamescoyle/vue-icon'
import { setI18nLanguage } from '@/plugins/i18n.js'
import { mdiMagnify, mdiAccount, mdiMenu, mdiClose } from '@mdi/js'
import themes from '@/styles/scss/temp.js'

export default {
  name: 'HeaderComponent',
  components: {
    SvgIcon
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
        en: themes.us.theme,
        br: themes.br.theme
      }

      this.presentTheme = themeMap[theme] || themes.general.black
    },
    handleChangeLocale(locale) {
      setI18nLanguage(locale)
      this.changeTheme(locale)
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateItems(newLocale)
    }
  },
  mounted() {
    const locale = localStorage.getItem('locale')
    setI18nLanguage(locale)
    this.changeTheme(locale)
    this.updateItems(locale)
  }
}
</script>

<style scoped src="./style.scss"></style>
