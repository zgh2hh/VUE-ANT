export default {
  path: '/map',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/map'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/map')), '/map')
    }
  ]
}
