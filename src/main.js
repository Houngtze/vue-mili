// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vuex from 'vuex'
Vue.use(Vuex)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import 'util'

import layer from 'vue-layer-mobile'
import 'vue-layer-mobile/need/layer.css'
Vue.use(layer)

let Base64 = require('js-base64').Base64;

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/image/default/default-1.png'),
  loading: require('./assets/image/default/default-1.png'),
  attempt: 1
})

let history = {
    count:4,    //初识tab切换数量
    '/index':1,
    '/collection':2,
    '/follow':3,
    '/my':4
};
// //设置初识sessionStorage
window.sessionStorage.setItem('history',JSON.stringify(history));


router.beforeEach(function (to, from, next) {
    let history = JSON.parse(window.sessionStorage.history);
    let historyCount = history.count * 1;
    const toIndex = history[to.path];        // 要去的索引
    const fromIndex = history[from.path];    //要离开的索引

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex) > parseInt(fromIndex) || (toIndex === '0' && fromIndex === '0')) {
            history['transitionName'] = 'forward';
        } else {
            history['transitionName'] = 'reverse';
        }
    } else {
        //如果当前路由没有在 sessionStorage 记录过得话，执行下面逻辑
        ++historyCount;
        history['count'] = historyCount;
        to.path !== '/' && (history[to.path] = historyCount);
        history['transitionName'] = 'forward';
    }

    history = JSON.stringify(history);

    window.sessionStorage.setItem('history',history);

    let token = store.state.token;
     //判断要去的路由有没有requiresAuth
     if (to.meta.needToken) {
      if (token) {
       next();
      } else {
       next({
        path: '/login',
        query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
       });
      }
     } else {
      next(); 
     }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1];
        window.location.href = `http${url}`
    } else { 
        next()
    }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
