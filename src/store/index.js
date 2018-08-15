import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: window.localStorage.getItem('token'),
  user: window.localStorage.getItem('user'),
  userAcount: window.localStorage.getItem('userAcount'),
  userPoint: window.localStorage.getItem('userPoint')
};
const mutations = {
  LOGIN: (state, data) => {
    //更改token的值
    state.token = data;
    window.localStorage.setItem('token', data);
  },
  LOGOUT: (state) => {
    //登出的时候要清除token
    state.token = null;
    state.user = null;
    state.userAcount = null;
    state.userPoint = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userAcount');
    window.localStorage.removeItem('userPoint');
  },
  USER: (state, data) => {
    //把用户名存起来
    state.user = JSON.stringify(data.user);
    state.userAcount =  JSON.stringify(data.userAcount);
    window.localStorage.setItem('user', JSON.stringify(data.user));
    window.localStorage.setItem('userAcount', JSON.stringify(data.userAcount));
  },
  USERPOINT: (state, data) => {
    state.userPoint = data;
    window.localStorage.setItem('userPoint', data);
  }
};
const actions = {
  UserLogin({ commit }, data){
    commit('LOGIN', data);
  },
  UserLogout({ commit }){
    commit('LOGOUT');
  },
  User({ commit }, data){
    commit('USER', data);
  },
  UserPoint({ commit }, data){
    commit('USERPOINT', data);
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions
});