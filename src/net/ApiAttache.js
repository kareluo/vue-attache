/* eslint-disable */
import { apply, invoke } from '../utils/invoke'

export default class ApiAttache {
  constructor(config) {
    this.config = config
  }

  setup(component) {
    this.component = component
    const { trigger } = this.config
    if (trigger && typeof trigger === 'string') {
      const trig = ApiAttache.prototype.trig
      const fn = component[trigger]
      const that = this
      component[trigger] = async function () {
        apply(that, trig, [component].concat(arguments))
        .then(() => {
          if (fn) {
            fn.apply(component, arguments)
          }
        })
      }
    }
  }

  async trig(component = this.component, ...args) {
    try {
      await invoke(component, this.config.begin)
      const a = await this.beforeFetch({ component, args })
      const b = await this.fetch(a)
      await this.afterFetch(b)
      await invoke(component, this.config.end)
    } catch (e) {
      console.error(e)
      // TODO      
    }
  }

  async beforeFetch({ component = this.component, args }) {
    const url = await apply(component, this.config.url, args)
    const data = await apply(component, this.config.data, args)
    return { component, url, data }
  }

  async fetch({ component = this.component, url, data }) {
    const fetch = this.config.fetch
    const response = await invoke(component, fetch, {
      url,
      data,
      method: this.config.method
    })
    return { component, response }
  }

  async afterFetch({ component = this.component, response }) {
    const config = this.config

    const { success, data } = await invoke(component, config.response, response)
    if (!success) {
      throw response
    }

    const { success: succ, data: dat } = await invoke(component, config.result, data)

    let result
    if (succ) {
      result = await invoke(component, config.success, dat)
    } else {
      result = await invoke(component, config.failure, dat)
    }

    if (result) {
      const datanames = config.datanames
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
  }

  process(component, response) {
    const config = this.config
    return invoke(component, config.response, response)
    .then(({ success, data }) => {
      if (success) {
        return invoke(component, config.result, data)
      } else {
        throw response
      }
    })
    .then(({ success, data }) => {
      if (success) {
        return invoke(component, config.success, data)
      } else {
        return invoke(component, config.failure, data)
      }
    })
  }

  error(e) {
    console.error(e)
  }
}
