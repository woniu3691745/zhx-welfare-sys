import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

const whiteList = ['/index', '/register', '/bindPhoneNum', '/setPassWord', '/setPayPassWord', '/login', '/resetLoginPassWord', '/authredirect']
router.beforeEach((to, from, next) => {
  // NProgress.configure({ ease: 'ease', speed: 500 })
  NProgress.start()
  if (getToken()) {
    if (to.path === '/index') {
      next({ path: '/home' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(req => {
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
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
