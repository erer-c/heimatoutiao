// 封装axios,统一处理token
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置接口路径前缀

// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
//   debugger
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
})
export default axios
