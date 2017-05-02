import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import login from './features/login/router'
import fields from './features/fields/router'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/login'
  },
    login,
    fields
  ]
})

// 同步store和路由
sync(store, router)

export default router
