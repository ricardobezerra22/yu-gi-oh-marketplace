<template>
  <div class="flags">
    <img
      v-if="this.$i18n.locale !== 'pt'"
      src="@/assets/images/flags/pt.png"
      alt="portugal"
      width="35"
      @click="handleChangeLocale('pt')"
    />

    <img
      v-if="this.$i18n.locale !== 'en'"
      src="@/assets/images/flags/en.png"
      alt="usa"
      width="35"
      @click="handleChangeLocale('en')"
    />

    <img
      v-if="this.$i18n.locale !== 'br'"
      src="@/assets/images/flags/br.png"
      alt="brazil"
      width="35"
      @click="handleChangeLocale('br')"
    />
  </div>
</template>

<script>
import { setI18nLanguage } from '@/plugins/i18n.js'
export default {
  name: 'NationFlags',
  methods: {
    handleChangeLocale(locale) {
      setI18nLanguage(locale)
      this.$emit('changeLocale', locale)
    }
  },
  mounted() {
    const locale = localStorage.getItem('locale')
    setI18nLanguage(locale)
  }
}
</script>

<style scoped src="./style.scss"></style>
