import Vue from 'vue'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/theme.scss'
import axios from '@/utils/axios'
import filters from '@/utils/filters'
import store from '@/store'
import App from '@/App'
import router from '@/router'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
filters(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
