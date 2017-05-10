export default {
  path: '/sensors',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/sensors'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/sensors')), '/sensors')
    },{
      path: 'history/:peng_no/:type',
      component: r => require.ensure([], () => r(require('./pages/history')), '/sensors')
    },{
      path: 'loading',
      component: r => require.ensure([], () => r(require('./pages/vueInfiniteLoading')), '/sensors')
    }
  ]
}
