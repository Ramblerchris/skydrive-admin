import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Main from '@/views/main/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'main',
    component: Main
  }
]

const router = new VueRouter({
  routes
})

export default router
