import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userinfo: {}
  },
  mutations: {
    //  方法
    saveToken (state, token) {
      state.token = token
      window.localStorage.setItem('utoken', token)
    },
    saveUserInfo (state, userinfo) {
      state.userinfo = userinfo
      window.localStorage.setItem('userinfo', userinfo)
    },
    loginOut (state) {
      state.userinfo = {}
      window.localStorage.removeItem('userinfo')
      state.token = ''
      window.localStorage.removeItem('utoken')
    }
  },
  actions: {
    //  可以写异步方法
  },
  getters: {
    //  相当与计算属性
    getToken (state) {
      console.log('store token11', state.token)
      if (state.token === '') {
        state.token = window.localStorage.getItem('utoken')
        console.log('store token22', state.token)
      }
      return state.token
    },
    getUserPhoto (state) {
      console.log('getUserPhoto ', state.userinfo)
      if (!state.userinfo) {
        state.userinfo = window.localStorage.getItem('userinfo')
        console.log('store token22', state.token)
      }
      return state.userinfo
    },
    getImageUrl (state) {
      const token = state.token
      console.log(' token', token)
      return (sha1) => `${config.BaseUrl}/file/open?token=${token}&filesha1=${sha1}`
    },
    getImageUrlQ (state) {
      const token = state.token
      console.log(' token', token)
      return (sha1) => `${config.BaseUrl}/file/open?token=${token}&filesha1=${sha1}&q=10`
    }
  },
  modules: {
  }
})
