import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import br from '@/locales/br.json'
import pt from '@/locales/pt.json'

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'us',
  fallbackLocale: 'us',
  messages: {
    us: en,
    br: br,
    pt: pt
  },
  allowComposition: true
})

export function setI18nLanguage(locale) {
  i18n.global.locale = locale
  localStorage.setItem('locale', locale)
}

export default i18n
