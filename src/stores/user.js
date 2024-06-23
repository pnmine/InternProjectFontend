import { defineStore } from 'pinia'
import axios from '../axios.js'
export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    user: {
      token: null,
      userId: null,
      tokenExpiration: null
    }
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.user.token
    }
  },
  actions: {
    login(token, tokenExpiration, userId) {
      this.loggedIn = true
      this.user.token = token
      this.user.tokenExpiration = tokenExpiration
      this.user.userId = userId
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiration', tokenExpiration)
      localStorage.setItem('userId', userId)
      axios.defaults.headers.common['Authorization'] = 'bearer' +" "+ token
      console.log('axios.defaults', axios.defaults)
    },
    logon() {
      console.log("logon");
      this.user.token = localStorage.getItem('token')
      this.user.tokenExpiration = localStorage.getItem('tokenExpiration')
      this.user.userId = localStorage.getItem('userId')
      if(this.user.token){
        this.loggedIn = true
        axios.defaults.headers.common['Authorization'] = 'bearer' +" "+ this.user.token
      }

      if (this.user.token && this.user.tokenExpiration) {
        const expiresIn = +this.user.tokenExpiration - new Date().getTime()
        if (expiresIn < 0) {
          this.logout()
        }
      }

      if (!this.user.token || !this.user.tokenExpiration || !this.user.userId) {
        this.logout()
      }
    },
    logout() {
      axios.defaults.headers.common['Authorization'] = ''
      this.loggedIn = false
      this.user.token = null
      this.user.userId = null
      this.user.tokenExpiration = null

      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
      localStorage.removeItem('userId')
    }
  }
})
