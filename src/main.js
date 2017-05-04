// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import {sync} from 'vuex-router-sync'
import App from './App'
import store from './store'
import router from './router'
import './config/rem'
import {ToastPlugin, LoadingPlugin, ConfirmPlugin} from 'vux'

Vue.use(ToastPlugin)    // 使用提醒
Vue.use(LoadingPlugin)  // 使用Loading
Vue.use(ConfirmPlugin)  // 使用Confirm

// 同步store和路由
sync(store, router)

FastClick.attach(document.body)  // 使用fastclick
Vue.config.productionTip = false

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

export default app

