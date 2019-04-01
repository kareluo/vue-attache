/* eslint-disable */
import Attache from '../index'
import Fetcher from './Fetcher'
import { apply, invoke } from '../utils/invoke'

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

export default class ApiAttache {
  constructor(config) {
    this.config = Object.create(BaseApiAttacheConfig)
    Object.assign(this.config, config)
  }

  setup(component) {
    this.component = component
    const { trigger } = this.config
    if (trigger && typeof trigger === 'string') {
      const that = this
      const fn = component[trigger]
      component[trigger] = function () {
        ApiAttache.prototype.trig.apply(that, [this.component].concat(arguments))
        if (fn) fn.apply(component, arguments)
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
    const url = await apply(component, this.config.url, args)
    const data = await apply(component, this.config.data, args)
    return { component, url, data }
  }

  async fetch({ component = this.component, url, data }) {
    const res = await invoke(component.$attache,
      Attache.prototype.fetch, {
        url,
        data,
        method: this.config.method
      })
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

    this.dispatch(res, { component, response, result, success, failure })
    .then(result => {
      console.log('return', result)
      if (result) {
        const datanames = this.config.datanames
        if (datanames) {
          if (Array.isArray(datanames)) {
            datanames.forEach(name => {
              component[name] = result[name]
            })
          } else if (typeof datanames === 'string') {
            component[datanames] = result
          }
        }
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  dispatch(res, { component, response, result, success, failure }) {
    console.log('response:', res)
    return invoke(component, (response || this._response), res)
    .then(({ success = false, data }) => {
      console.log('result', success, data)
      if (success) {
        return invoke(component, (result || this._result), data)
      } else {
        return Promise.reject('xass')
      }
    })
    .then(({ success: succ = false, data }) => {
      console.log('success', succ, data)
      if (succ) {
        return invoke(component, (success || this._success), data)
      } else {
        return invoke(component, (failure || this._failure), data)
      }
    })
  }

  error(e) {
    console.error(e)
  }
}
