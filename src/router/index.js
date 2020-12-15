import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Main from '@/views/main/'
import Data from '@/views/data'
import allfile from '@/views/file/'
import alluser from '@/views/user/alluser.vue'
import loginlog from '@/views/user/loginlog.vue'
import tokenlist from '@/views/user/tokenlist.vue'
import deletefile from '@/views/userfile/deletefile.vue'
import dir from '@/views/userfile/dir.vue'
import publishshare from '@/views/userfile/publishshare.vue'
import setting from '@/views/setting/'

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
        component: Data
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

export default router
