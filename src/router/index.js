import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import defaultHome from '../views/home/home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, {
    path: '/home',
    component: home,
    children: [{
      path: '',
      component: defaultHome
    }, {
      path: 'comment',
      component: () => import('../views/comment')// 按需加载
    }]
  }]
})
