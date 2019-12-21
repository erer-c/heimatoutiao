import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import elementUI from 'element-ui'
import component from './components/index'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utills/request'
Vue.use(elementUI)
Vue.use(component)
Vue.config.productionTip = false

Vue.prototype.$axios = axios// 给Vue原型对象添加axios属性,赋值给全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
