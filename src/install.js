/* eslint-disable */
import Attache from './index'


export function install (Vue) {
  Vue.mixin({
    beforeCreate() {
      this._attache = new Attache({})
      const configs = this.$options.configs
      if (configs && Array.isArray(configs)) {
        this._attache.setConfigs(configs)
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
