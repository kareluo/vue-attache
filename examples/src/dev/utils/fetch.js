import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5c9d95f035824d3a5f7f5d5e/vue-attache",
  timeout: 15000,
  // withCredentials: true,         // 支持跨域时发送 Cookie
});

export default service
