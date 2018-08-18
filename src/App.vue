<template>
  <div id="app">
    <div class="m-bar-footer  m-index-nav " style="  background-color: transparent !important;border-bottom:none" id="nav" v-show="isBottom">
        <div class="m-table" style="overflow:hidden;;border-bottom:none">
            <router-link to="/index" class="a1 m-table-cell m-col-xs-3" active-class="m-focus"> <s class=" s1"></s> <s class=" s2"></s> 首页 </router-link>
            <router-link to="/product" class="a2 m-table-cell m-col-xs-3" active-class="m-focus"> <s class=" s1"></s> <s class=" s2"></s> 产品 </router-link>
            <a class="a5 m-table-cell m-col-xs-3" active-class="m-focus" @click="noOpen"> <s class=" s1"></s> <s class=" s2"></s></a>
            <router-link to="/discovery" class="a3 m-table-cell m-col-xs-3" active-class="m-focus"> <s class=" s1"></s> <s class=" s2"></s> 发现 </router-link>
            <router-link to="/my" class="a4 m-table-cell m-col-xs-3" active-class="m-focus"> <s class=" s1"></s> <s class=" s2"></s> 我的 </router-link>
        </div>
    </div>
        <transition>
         <!--<transition name="fade">-->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        <!--</transition>-->
        </transition>
  </div>
</template>

<script>
import Utils from './utils'
export default {
  name: 'App',
      components:{
      },
      data(){
          return {
              isBottom:true,
              bottomArr:['/index','/product','','/discovery','/my']
          }
      },
      watch: {
          $route (to, from) {
               let index = this.bottomArr.indexOf(to.path);
               if(index == -1){
                   this.isBottom = false;
               }else{
                   this.isBottom = true;
               }
          }
      },
      methods: {
        noOpen: function() {
          Utils.toast("该功能暂未开放，请移至APP使用")
        }
      }
}
</script>

<style src="./assets/css/common.css"></style>
<style src="./assets/css/index.css"></style>
<style src="./assets/font/iconfont.css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%
  /*margin-top: 60px;*/
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.forward-enter-active,.forward-leave-active{
    transition: all 0.3s;
}

.forward-enter{
    transform: translateX(100%);
}
.forward-leave-to{
    transform: translateX(-100%);
}

.reverse-enter-active,.reverse-leave-active{
    transition: all 0.3s;
}
.reverse-enter{
    transform: translateX(-100%);
}
.reverse-leave-to{
    transform: translateX(100%);
}

</style>
