/* eslint-disable */

export function install (Vue) {
  Vue.mixin({
    created() {
      console.log('from vue attache')
    },
  })
}
