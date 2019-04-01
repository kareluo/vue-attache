/* eslint-disable */
import { invoke } from '../utils/invoke'

// request, { method, url, params, headers }
const defaults = {

  _fetch() {
    return Promise.reject('没有默认的fetch实现')
  },

  _response(response) {
    if (response) {
      return {
        success: response.status === 200,
        data: response.data
      }
    }
    // TODO
    return { success: false }
  },

  _result(data) {
    throw '没有处理业务响应'
  },

  _success(data) {
    return data
  },

  _failure(data) {
    return data
  },

  _error() {
    // TODO
  },

  fetch(request) {
    return defaults._fetch(request)
  },

  response(response) {
    return defaults._response(response)
  },

  result(data) {
    return defaults._result(data)
  },

  success(data) {
    return defaults._success(data)
  },

  failure(data) {
    return defaults._failure(data)
  },

  error() {
    // TODO
    return defaults._error()
  },
}

export default class Fetcher {

  constructor({ fetch, response, result, success, failure, error }) {
    this._fetch = fetch || defaults.fetch
    this._response = response || defaults.response
    this._result = result || defaults.result
    this._success = success || defaults.success
    this._failure = failure || defaults.failure
    this._error = error || defaults.error
  }

  fetch(request) {
    return this._fetch(request)
  }
  
  use({ fetch, response, result, success, failure, error }) {
    this._fetch = fetch || this._fetch
    this._response = response || this._response
    this._result = result || this._result
    this._success = success || this._success
    this._failure = failure || this._failure
    this._error = error || this._error
  }
}

export const fetcher = new Fetcher({})

Fetcher.use = function (methods) {
  fetcher.use(methods)
}
