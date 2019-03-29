/* eslint-disable */
import Attache from '../index'

const BaseApiAttacheConfig = {
  loading: false,
  method: 'get',
  // data: object, function, promise
  // url: string, function, promise
  // trigger: ''
  // filters: [],
  onResult: function (result, onSuccessResult, onFailureResult) {
    
  }
}

async function invoke(that, method, args) {
  let result = method
  while(true) {
    if (typeof result === 'function') {
      result = result.apply(that, args)
    } else if (result instanceof Promise) {
      result = await result
    } else break
  }
  return result
}

export default class ApiAttacheConfig {
  constructor(config) {
    this.config = Object.create(BaseApiAttacheConfig)
    Object.assign(this.config, config)
  }

  setup(component) {
    this.component = component
    const { trigger } = this.config
    if (trigger && typeof trigger === 'string') {
      const fn = component[trigger]
      const that = this
      component[trigger] = function () {
        const args = [this.component].concat(arguments)
        ApiAttacheConfig.prototype.trig.apply(that, args)
        if (fn) fn.apply(component, args)
      }
    }
  }

  trig(component = this.component, ...args) {
    this.beforeFetch({ component, args })
    .then(_ => this.fetch(_))
    .then(_ => this.afterFetch(_))
    .catch(this.error)
  }

  async beforeFetch({ component = this.component, args }) {
    const url = await invoke(component, this.config.url, args)
    const data = await invoke(component, this.config.data, args)
    return { component, url, data }
  }

  async fetch({ component = this.component, url, data }) {
    const res = await invoke(component.$attache, Attache.prototype.fetch, [{
      url,
      data,
      method: this.config.method
    }])
    return { component, res }
  }

  async afterFetch({ component = this.component, res }) {
    const {
      response,
      result,
      success,
      failure,
      error,
    } = this.config

    // TODO

    if (response) {
      await invoke(component, response, [res])
    }
    
    const datanames = this.config.datanames
    if (datanames) {
      datanames.forEach(name => {
        component[name] = datas[name]
      })
    }
  }

  error(e) {
    console.error(e)
  }
}
