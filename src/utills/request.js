// 封装axios,统一处理token
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置接口路径前缀
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`// 统一注入token，避免每次请求单独获取token
  return config
})

axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data)
}]// 超过最大安全数字，计算失真，通过JSONBig.parse(data)处理失真
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // debugger
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      message = '用户非实名认证用户，无权限登录'
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)// 延续错误处理，就会进入到catch
})
export default axios
