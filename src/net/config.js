/* eslint-disable */
const config = {
  method: 'get',
  loading: false,
  // data: object, function, promise
  // url: string, function, promise
  // trigger: ''
  // filters: [],

  begin() {
    // empty
  },

  /**
   * 拦截请求
   * @param {*} data 
   * return 是否拦截请求
   */
  intercept(data) {
    return false
  },

  fetch(request) {
    throw 'no implements'
  },

  response(response) {
    if (response) {
      return {
        success: response.status === 200,
        data: response.data
      }
    }
    return { success: false }
  },

  result(data) {
    throw 'no implements'
  },

  success(data) {
    return data
  },

  failure(data) {
    return data
  },

  error({ message, e }) {
    console.log(message)
    console.error(e)
  },

  end() {
    // empty
  },
}

export function use(cfg) {
  Object.assign(config, cfg)
}

export default config
