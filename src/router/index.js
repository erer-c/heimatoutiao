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
    }, {
      path: 'material',
      component: () => import('../views/material')
    }, {
      path: 'articles',
      component: () => import('../views/content')
    }, {
      path: 'publish', // 发表文章
      component: () => import('../views/publish')
    }, {
      path: 'publish/:articleId', // 修改文章
      component: () => import('../views/publish')// 同一组件
    }, {
      path: 'account',
      component: () => import('../views/account')
    }]
  }]
})
