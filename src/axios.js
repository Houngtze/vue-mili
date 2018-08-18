//axios.js
import axios from 'axios'
import store from './store'
import router from './router'
import Utils from './utils'
//创建axios实例
var instance = axios.create({
 timeout: 20000, //请求超过5秒即超时返回错误
 headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});
//request拦截器
instance.interceptors.request.use(
 config => {
  //判断是否存在token，如果存在的话，则每个http header都加上token
  if (store.state.token) {
   config.headers.Authorization = 'Bearer ' + store.state.token;
  }
  return config;
 }
);
//respone拦截器
instance.interceptors.response.use(
 response => {
  return response;
 },
 error => { //默认除了2XX之外的都是错误的，就会走这里
  console.log(error.message)
  if (error.message=="Network Error") {     // 网络出错
    Utils.toast("网络出错，请稍后重试");
  }
  if(error.message.indexOf('timeout')!=-1 ){  // 网络超时
      Utils.toast("网络超时，请稍后重试");
  }
  if (error.response) {
    console.log(error)
   switch (error.response.status) {
    case 401:
     // router.replace({ //跳转到登录页面
     //  path: 'login',
     //  query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
     // });
     Utils.dialog('','您的账号已在别处登录，请重新登录',['确定'],function () {
          store.dispatch('UserLogout');
          router.replace({ //跳转到登录页面
          path: 'login',
          query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
         });
       }
     )
      case 400: console.log('请求错误(400)') ; break;
      case 403: console.log('拒绝访问(403)'); break;
      case 404: console.log('请求出错(404)'); break;
      case 408: console.log('请求超时(408)'); break;
      case 500: console.log('服务器错误(500)'); break;
      case 501: console.log('服务未实现(501)'); break;
      case 502: console.log('网络错误(502)'); break;
      case 503: console.log('服务不可用(503)'); break;
      case 504: console.log('网络超时(504)'); break;
      case 505: console.log('HTTP版本不受支持(505)'); break;
   }
  }
  
  return Promise.reject(error.response);
 }
);


export default instance
// {
  // //用户注册
  // userRegister(data){
  //   return instance.post('/api/register', data);
  // },
  // //用户登录
  // userLogin(data){
  //   return instance.post('/api/login', data); 
  // },
  // //获取用户
  // getUser(){
  //   return instance.get('/api/user');
  // },
  // //删除用户
  // delUser(data){
  //   return instance.post('/api/delUser', data);
  // }
// }