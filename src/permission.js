import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { MessageBox } from 'mint-ui'

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
          if (!req.data.success) {
            MessageBox({
              message: req.data.message,
              closeOnClickModal: true,
              showConfirmButton: true
            })
            store.dispatch('LogOut').then(() => {
              next({ path: '/login' })
            })
          } else {
            next()
          }
          // next()
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
