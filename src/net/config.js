/* eslint-disable */
import { error } from '../utils/log'

const config = {

  /**
   * 是否输出调试信息
   */
  debug: false,

  /**
   * 请求 method
   */
  method: 'get',

  // param: object, function
  // query: object, function
  // header: object, function
  // body: object, function
  // url: string, function

  /**
   * 是否显示 Loading
   */
  loading: false,

  // trigger: ''

  // filters: [],

  // dataname: ''

  // datanames: ''

  /**
   * trigger 触发后立即调用
   */
  // begin: function

  /**
   * 拦截请求
   * @param {*} data 
   * return 是否拦截请求
   */
  intercept(data) {
    return false
  },

  /**
   * 网络请求，需要覆盖
   * @param {*} request 
   */
  fetch(request) {
    throw 'no implements'
  },

  /**
   * 网络请求回调
   * @param {*} response 
   */
  response(response) {
    if (response) {
      return {
        success: response.status === 200,
        data: response.data
      }
    }
    return { success: false }
  },

  /**
   * 业务响应处理，需要覆盖来确定业务 success 或 failure
   * @param {*} data 业务返回对象（具体结构因不同系统而定）
   */
  result(data) {
    throw 'no implements'
  },

  /**
   * 业务成功
   * @param {*} data 
   */
  success(data) {
    return data
  },

  /**
   * 业务失败
   * @param {*} data 
   */
  failure(data) {
    return data
  },

  /**
   * 错误回调
   * @param {*}
   */
  error(e) {
    if (config.debug) {
      error(e)
    }
  },

  /**
   * 请求流程完成时调用，成功失败错误等都会调用
   */
  // end: function
}

export function use(cfg) {
  Object.assign(config, cfg)
}

export default config
