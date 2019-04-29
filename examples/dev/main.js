/* eslint-disable */
import Vue from 'vue'
import App from './app.vue'
import VueAttache from 'vue-attache'
import service from './utils/fetch'

Vue.use(VueAttache)
VueAttache.use({
  debug: true,
  fetch({ method, url, query, body, header }) {
    return service({
      url,
      method,
      params: query,
      data: body,
      headers: header
    })
  },
  result(data) {
    return {
      success: data.success,
      data: data.data
    }
  }
})

new Vue({ render: h => h(App) }).$mount('#app')
