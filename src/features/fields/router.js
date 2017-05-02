export default {
  path: '/fields',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/fields'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/fieldList')), '/fields')
    },{
      path: '/fields/:id',
      component: r => require.ensure([], () => r(require('./pages/fieldInfo')), '/fields')
    }
  ]
}
