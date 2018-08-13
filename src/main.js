// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import 'util'
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
