
import store from '../../store'
export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // 将OPENID注入session
    path: '/home/:id/:redirectUrl/',
    redirect: to => {
      store.dispatch({
        type: 'setSession',
        amount: to.params.id
      })
      return `/${to.params.redirectUrl}/`
    }
  }
]
