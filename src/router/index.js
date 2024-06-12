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
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView/LoginView.vue')
    },
    {
      path: '/all-cards',
      name: 'allCards',
      component: () => import('@/views/AllCardsView/AllCardsView.vue')
    },
    {
      path: '/trades',
      name: 'trades',
      component: () => import('@/views/TradesView/TradesView.vue')
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('@/views/InventoryView/InventoryView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('@/views/NotFoundView/NotFoundView.vue')
    }
  ]
})

export default router
