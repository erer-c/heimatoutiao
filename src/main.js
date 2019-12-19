import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
Vue.use(elementUI)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置接口路径前缀
Vue.prototype.$axios = axios// 给Vue原型对象添加axios属性,赋值给全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
