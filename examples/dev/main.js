import Vue from 'vue'
import App from './app.vue'
import VueAttache from 'vue-attache'
import service from './utils/fetch'

Vue.use(VueAttache)
VueAttache.fetcher(({ url, method, data }) => {
  return service({
    url,
    method,
    params: data
  })
})

new Vue({
  render: h => h(App)
}).$mount('#app')
