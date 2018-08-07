import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import product from '@/views/product'
import lqb from '@/views/lqb'
import discovery from '@/views/discovery'
import my from '@/views/my'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/index',name: 'index',component: index},
    {path: '/product', name:'product', component: product},
  	{path: '/lqb', name:'lqb', component: lqb},
  	{path: '/discovery', name:'discovery', component: discovery},
  	{path: '/my', name: 'my',component:my },
  ],
  'linkActiveClass':'active'  //为路由匹配激活link-active，方便设置类
})
