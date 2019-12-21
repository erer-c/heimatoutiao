
import router from '../router'
// router.beforeEach 全局前置守卫
router.beforeEach(function (to, from, next) {
//   console.log(to.path)
// 判断是不是以/home开头的地址，如果是判断是否有token，否则直接放行
  if (to.path.startsWith('/home')) {
    let token = localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
