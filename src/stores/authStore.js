import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: localStorage.getItem('userId') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    userEmail: localStorage.getItem('userEmail') || null,
    username: localStorage.getItem('username') || null
  }),
  actions: {
    setUserData(data, token) {
      this.isAuthenticated = true
      this.userId = data.id
      this.userEmail = data.email
      this.username = data.name
      localStorage.setItem('token', token)
      localStorage.setItem('userId', data.id)
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('username', data.name)
    },
    clearUserData() {
      this.userId = null
      this.userEmail = null
      this.username = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('username')
    }
  }
})
