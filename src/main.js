import '@/styles/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Install Pinia before using stores
const pinia = createPinia()
app.use(VueApexCharts)
app.use(pinia)

app.use(i18n)
app.use(router)
app.use(vuetify)

app.mount('#app')
