export default {
  path: '/login',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/login'),
  redirect: '/login/',
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/login')), '/login')
    },{
      path: '/validatePhone/:op',
      component: r => require.ensure([], () => r(require('./pages/validatePhone')), '/register')
    },{
      path: '/completeInfo',
      component: r => require.ensure([], () => r(require('./pages/completeInfo')), '/completeInfo')
    },{
      path: '/reset',
      component: r => require.ensure([], () => r(require('./pages/reset')), '/reset')
    }
  ]
}
