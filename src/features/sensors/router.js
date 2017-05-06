export default {
  path: '/sensors',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/sensors'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/sensors')), '/sensors')
    },{
      path: 'history/:type/:peng_no',
      component: r => require.ensure([], () => r(require('./pages/history')), '/sensors')
    }
  ]
}
