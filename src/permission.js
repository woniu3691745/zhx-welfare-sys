import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/authredirect']// 不重定向白名单
router.beforeEach((to, from, next) => {
  // NProgress.configure({ ease: 'ease', speed: 500 })
  NProgress.start() // 开启Progress
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(req => { // 拉取user_info
          // store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
          //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //   next({ ...to }) // hack方法 确保addRoutes已完成
          // })
          // next({ ...to })
          next()
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
