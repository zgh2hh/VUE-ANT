export default {
  path: '/sensors',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/sensors'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/sensors')), '/sensors')
    }
  ]
}
