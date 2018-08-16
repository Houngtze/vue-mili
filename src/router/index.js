import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 去中心化管理
// const allRoutes = require.context('../views/', true, /\.vue$/)

// const routes = allRoutes.keys().map(route => {
//   const componentName = route.replace(/(\.\/|\.vue)/g, '')
//   return {
//     path: '/${componentName}',
//     name: componentName,
//     component: allRoutes(route).default
//   }
// })

export default new Router({
  mode: 'history',
  routes: [
    {path: '/index',name: 'index',component: resolve => require(['@/views/index'], resolve)},
    {path: '/product', name:'product', component: resolve => require(['@/views/product'], resolve)},
  	{path: '/lqb', name:'lqb', meta: {needToken: true}, component: resolve => require(['@/views/lqb'], resolve)},
  	{path: '/discovery', name:'discovery', component: resolve => require(['@/views/discovery'], resolve)},
  	{path: '/my', name: 'my',component:resolve => require(['@/views/my'], resolve) },

    // login
    {path: '/login', name: 'login',component:resolve => require(['@/views/login/login'], resolve) },
  	{path: '/register', name: 'register',component:resolve => require(['@/views/login/register'], resolve) },

    // index
    {path: '/news', name: 'news',component:resolve => require(['@/views/index/news'], resolve) },
    {path: '/newsDetail', name: 'newsDetail',component:resolve => require(['@/views/index/newsDetail'], resolve) },

    // product
    {path: '/productDetail', name: 'productDetail',component:resolve => require(['@/views/product/productDetail'], resolve) },
    {path: '/productInvest', name: 'productInvest',meta: {needToken: true},component:resolve => require(['@/views/product/productInvest'], resolve) },

  ],
  'linkActiveClass':'active'  //为路由匹配激活link-active，方便设置类
})
