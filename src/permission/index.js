import router from '../router'
// router.beforeEach 全局前置守卫
router.beforeEach(function (to, from, next) {
  // console.log(to)
  // 判断是不是以/home开头的地址，如果是判断是否有token，否则直接放行
  if (to.path.startsWith('/home')) {
    let token = localStorage.getItem('user-token')
    token ? next() : next('/login')
  } else {
    next()
  }
  // if (to.path.startsWith('/home')) {
  //   let token = window.localStorage.getItem('user-token')
  //   token ? next():next('/login')
  // }
})
export default router
// 引入router
// router.beforeEach(function(to,from,next){
// 判断地址是否以home开头，不是则放行
// 如果是判断是否有token，有放行，没有强制转到登录页

// })
// 导出router
// 在main.js中直接引入此文件
