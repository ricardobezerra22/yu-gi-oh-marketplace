<template>
  <div class="container">
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
    <div class="second">
      <nav class="nav-subcontainer">
        <div class="nav-itens">
          <span> Home </span>
          <span> Business </span>
          <span> Entertainment </span>
          <span> Health </span>
          <span> Science </span>
          <span> Sports </span>
          <span> Technology </span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { setI18nLanguage } from '@/plugins/i18n.js'
import { mdiMagnify, mdiAccount } from '@mdi/js'
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
      presentTheme: ''
    }
  },
  methods: {
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
  mounted() {
    setI18nLanguage(localStorage.getItem('locale'))
    this.changeTheme(localStorage.getItem('locale'))
  }
}
</script>

<style scoped src="./style.scss"></style>
