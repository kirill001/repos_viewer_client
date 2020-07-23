import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(vueAxios, axios);

Vue.config.productionTip = false

new Vue({
  data: {apiUrl: 'http://127.0.0.1:8000'},
  router,
  store,
  render: h => h(App)
}).$mount('#app')
