import App from './App'
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import index from './router/index/router'
//路由开始
import login from './features/login/router'
import fields from './features/fields/router'
import sensors from './features/sensors/router'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  routes: [
      ...index,
      login,
      fields,
      sensors
  ]
})

// 页面刷新时，重新赋值session
// if (window.localStorage.getItem('session')){
//    store.dispatch({
//       type: 'setSession',
//       amount: window.localStorage.getItem('session')
//    })
// }

//是否有OPENID若没有则跳到授权
// router.beforeEach((to, from, next) => {
//   if (store.state.common.session) {
//     next();
//   } else {
//     store.dispatch({
//       type: 'clearSession'
//     })
//     window.location.href = "https://www.baidu.com"
//   }
// })

export default router
