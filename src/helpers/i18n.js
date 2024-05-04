import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import br from '@/locales/br.json'
import pt from '@/locales/pt.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    br: br,
    pt: pt
  },
  allowComposition: true
})

export default i18n
