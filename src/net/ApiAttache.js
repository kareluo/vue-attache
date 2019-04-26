import { i, e } from '../utils/log'
import { apply, invoke } from '../utils/invoke'

export default class ApiAttache {
  constructor (config) {
    this.config = config
  }

  setup (component) {
    this.component = component
    const { trigger } = this.config
    if (trigger && typeof trigger === 'string') {
      const trig = ApiAttache.prototype.trig
      const fn = component[trigger]
      const that = this
      component[trigger] = async function (...args) {
        apply(that, trig, [component].concat(args))
        if (fn) {
          fn.apply(component, args)
        }
      }
    }
  }

  async trig (component = this.component, ...args) {
    const debug = this.config.debug
    try {
      if (debug) {
        i('begin:', component)
      }
      if (this.config.begin) {
        if (debug) {
          i('begin-call')
        }
        await invoke(component, this.config.begin)
      }

      if (debug) {
        i('before-fetch:', args)
      }
      const a = await this.beforeFetch({ component, args })

      if (debug) {
        i('fetch:', a.url, a.data)
      }
      const b = await this.fetch(a)

      if (debug) {
        i('after-fetch:', b.response)
      }
      await this.afterFetch(b)
    } catch (e) {
      this.error(e)
    }

    if (debug) {
      i('end')
    }
    if (this.config.end) {
      if (debug) {
        i('end-call')
      }
      await invoke(component, this.config.end)
    }
  }

  async beforeFetch ({ component = this.component, args }) {
    const result = { component }
    const { url, param, query, body, header } = this.config

    if (url) {
      result.url = await apply(component, url, args)
    }

    if (param) {
      result.param = await apply(component, param, args)
      const url = result.url
      const reg = /\{([A-Za-z_]\w*)\}/g
      const matches = []
      let match = reg.exec(url)
      while (match) {
        matches.push(match)
        match = reg.exec(url)
      }
      if (matches.length > 0) {
        result.url = matches.reduce((u, m) => {
          return u.replace(m[0], result.param[m[1]])
        }, url)
      }
    }

    if (query) {
      result.query = await apply(component, query, args)
    }

    if (body) {
      result.body = await apply(component, body, args)
    }

    if (header) {
      result.header = await apply(component, header, args)
    }

    return result
  }

  async fetch ({ component = this.component, url, param, query, body, header }) {
    const fetch = this.config.fetch
    const request = {
      url,
      param,
      query,
      body,
      header,
      method: this.config.method
    }

    if (this.config.debug) {
      i('fetch-request:', request)
    }
    const response = await invoke(component, fetch, request)
    return { component, response }
  }

  async afterFetch ({ component = this.component, response }) {
    const config = this.config

    const { success, data } = await invoke(component, config.response, response)

    if (!success) {
      throw response
    }

    const { success: succ, data: dat } = await invoke(component, config.result, data)

    if (succ) {
      await invoke(component, config.success, dat)
    } else {
      await invoke(component, config.failure, dat)
    }

    if (config.debug) {
      i('after-fetch-data:', dat)
    }
    if (dat) {
      const { dataname, datanames } = config
      if (dataname) {
        if (config.debug) {
          i('after-fetch-dataname:', `${dataname} <-`, dat)
        }
        component[dataname] = dat
      }
      if (datanames && Array.isArray(datanames)) {
        if (config.debug) {
          datanames.forEach(name => {
            if (typeof name === 'object') {
              i('after-fetch-datanames:', `${name.key} <-`, dat[name.value])
              component[name.key] = dat[name.value]
            } else {
              i('after-fetch-datanames:', `${name} <-`, dat[name])
              component[name] = dat[name]
            }
          })
        } else {
          datanames.forEach(name => {
            if (typeof name === 'object') {
              component[name.key] = dat[name.value]
            } else {
              component[name] = dat[name]
            }
          })
        }
      }
    }
  }

  error (exception) {
    if (this.config.debug) {
      e(exception)
    }
    this.config.error(exception)
  }
}
