import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Loading from './components/loading'
// import '@/mock'  // 该项目所有请求使用mockjs模拟
import '@/permission' // 权限
Vue.use(Mint)
Vue.use(Loading)
Vue.config.productionTip = false
Vue.filter('ADDRESS_SHOW_CALSS', function (data, key, defaultkey) {
  if (key === defaultkey) {
    return {
      'mint-checked': true,
      'mint-checkbox-cores': true,
      'mint-checkbox-corsafter': true
    }
  } else {
    return {
      'mint-checked': false,
      'mint-checkbox-cores': true,
      'mint-checkbox-corsafter': false
    }
  }
})
// vue-title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
