export default {
  path: '/activities',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/activities'),
  redirect: '/activities/',
  children: [{
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/activities')
    }
  ]
}
