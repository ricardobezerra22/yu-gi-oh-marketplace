import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import LoginView from '@/views/LoginView/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
    // {
    //   path: '/coin/:coin',
    //   name: 'coin',
    //   props: true,
    //   component: () => import('@/views/CoinTimeLineView/CoinTimeLineView.vue')
    // }
  ]
})

export default router
