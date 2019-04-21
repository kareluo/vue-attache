/* eslint-disable */

import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import VueAttache from 'vue-attache'

Vue.use(VueRouter)
Vue.use(VueAttache)

// const router = new VueRouter({
//   mode: 'history',
//   routes: [{
//     path: '/',
    
//   }],
// })

console.log(App)

new Vue({
  render: h => h(App)
}).$mount('#app')
