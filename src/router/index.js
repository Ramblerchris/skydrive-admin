import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Main from '@/views/main/'
import Dashboard from '@/views/dashboard'
import allfile from '@/views/file/'
import alluser from '@/views/user/alluser.vue'
import tokenlist from '@/views/user/tokenlist.vue'
import dir from '@/views/userfile/dir.vue'
import setting from '@/views/setting/'
import importfile from '@/views/importfile/'
import alluserfile from '@/views/userfile/alluserfile.vue'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/',
  name: 'main',
  component: Main,
  children: [{
    path: '',
    // path: '',
    component: Dashboard,
    name: 'Default'
  },
  {
    path: '/',
    // path: '',
    component: Dashboard,
    name: 'Dashboard'
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
    path: '/tokenlist',
    component: tokenlist
  },
  {
    path: '/alluserfile',
    component: alluserfile
  },
  {
    path: '/dir',
    component: dir
  },
  {
    path: '/setting',
    component: setting,
    name: 'setting'
  },
  {
    path: '/importfile',
    component: importfile,
    name: 'importfile'
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
