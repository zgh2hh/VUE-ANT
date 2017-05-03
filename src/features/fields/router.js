export default {
  path: '/fields',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/fields'),
  redirect: '/fields/',
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/fieldList')), '/fields/list')
    },{
      path: ':id',
      component: r => require.ensure([], () => r(require('./pages/fieldInfo')), '/fields/info')
    }
  ]
}
