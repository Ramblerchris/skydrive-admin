import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './styles/index.less'
import 'element-tiptap/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import vueParticles from 'vue-particles'
import elementTipTap from 'element-tiptap'
import elementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(vueParticles)
Vue.use(elementTipTap)
Vue.use(elementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
