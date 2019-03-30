import { invoke } from '../utils/invoke'

// request, { method, url, params, headers }
const defaults = {

  defaultFetch() {
    return Promise.reject('没有默认的fetch实现')
  },

  defaultResponse(result) {
    const res = { success: false }
    if (result) {
      res.data = result.data
      res.success = result.status === 200
    }
    return res
  },

  defaultSuccessResponse({ data, onSuccess, onFailure, result }) {
    throw '没有处理网络请求'
  },

  defaultFailureResponse(args) {
    console.warn('没有处理网络请求错误')
  },

  fetch(request) {
    return defaults.defaultFetch(request)
  },

  onResponse(result) {
    return defaults.defaultResponse(result)
  },

  onSuccessResponse(args) {
    return defaults.defaultSuccessResponse(args)
  },

  onFailureResponse(args) {
    return defaults.defaultFailureResponse(args)
  },
}

export default class Fetcher {

  constructor({
    fetch,
    response,
    result,
    success,
    failure,
  }) {
    this._fetch = fetch || defaults.fetch
    this._response = response || defaults.response
    this._result = result || defaults.result
    this._success = success || defaults.success
    this._failure = failure || defaults.failure
  }

  fetch(request) {
    console.log('request', request)
    return this._fetch(request)
  }

  response(res, { component, response, result, success, failure, error }) {
    invoke(component, (response || this._response), res)
    .then(({ success = false, data }) => {
      if (success) {
        return invoke(component, (result || this._result), data)
      } else {
        return Promise.reject('xass')
      }
    })
    .then(({ success: s = false, data }) => {
      if (s) {
        return invoke(component, (success || this._success), data)
      } else {
        return invoke(component, (failure || this._failure), data)
      }
    })
    .catch(({}) => {
      
    })
  }
  
  use({ fetch, response,  }) {
    this.fetch = fetch
  }
}

Fetcher.use = function (fetch) {
  defaults.defaultFetch = fetch
}

export const fetcher = new Fetcher({})
