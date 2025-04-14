import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // user: null as null | { id: string; email: string; role: string },
    token: null as string | null,
  }),
  actions: {
    login(
      token: string,
      // userData?: { id: string; email: string; role: string }
    ) {
      this.token = token
      //   this.user = userData
      localStorage.setItem('token', token)
      //   localStorage.setItem('user', JSON.stringify(userData))
    },
    logout() {
      this.token = null
      //   this.user = null
      localStorage.clear()
    },
    initialize() {
      const token = localStorage.getItem('token')
      //   const user = localStorage.getItem('user')
      if (token) {
        this.token = token
        // this.user = JSON.parse(user)
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    // isAdmin: (state) => state.user?.role === 'ADMIN',
  },
})
