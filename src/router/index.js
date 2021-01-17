import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Main from '@/views/main/'
import Dashboard from '@/views/dashboard'
import allfile from '@/views/file/'
import alluser from '@/views/user/alluser.vue'
import loginlog from '@/views/user/loginlog.vue'
import tokenlist from '@/views/user/tokenlist.vue'
import deletefile from '@/views/userfile/deletefile.vue'
import dir from '@/views/userfile/dir.vue'
import publishshare from '@/views/userfile/publishshare.vue'
import setting from '@/views/setting/'
import store from '@/store/index.js'

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
    component: Main,
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: '/allfile',
        component: allfile
      },
      {
        path: '/alluser',
        component: alluser
      },
      {
        path: '/loginlog',
        component: loginlog
      },
      {
        path: '/tokenlist',
        component: tokenlist
      },
      {
        path: '/deletefile',
        component: deletefile
      },
      {
        path: '/dir',
        component: dir
      },
      {
        path: '/publishshare',
        component: publishshare
      },
      {
        path: '/setting',
        component: setting
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let isAuth = false
  const token = store.getters.getToken
  if (token !== null && token !== '') {
    isAuth = true
  }
  if (to.name !== 'login' && !isAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
