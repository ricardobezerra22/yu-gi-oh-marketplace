import { createI18n } from 'vue-i18n'
import messages from './locales' // Import your translation files

export default createI18n({
  locale: 'en', // Set the default locale (language)
  fallbackLocale: 'en', // Fallback to English if translation is missing
  messages
})
