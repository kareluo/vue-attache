/* eslint-disable */
import Attache from './index'


export function install (Vue) {
  Vue.mixin({
    beforeCreate() {
      this._attache = new Attache({})
      const attaches = this.$options.attaches
      if (attaches && Array.isArray(attaches)) {
        this._attache.setAttaches(attaches)
      }
    },
    created() {
      this._attache.setup(this)
    },
  })

  Object.defineProperty(Vue.prototype, '$attache', {
    get() { return this._attache }
  })
}
