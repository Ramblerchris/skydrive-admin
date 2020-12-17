import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    //  方法
    saveToken (state, token) {
      state.token = token
      window.localStorage.setItem('utoken', token)
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
    }
  },
  modules: {
  }
})
