import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/coin/:coin',
      name: 'coin',
      props: true,
      component: () => import('@/views/CoinTimeLineView/CoinTimeLineView.vue')
    },
    {
      path: '/tracked/',
      name: 'tracked',
      props: true,
      component: () => import('@/views/TrackedCoinsView/TrackedCoinsView.vue')
    }
  ]
})

export default router
