<template>
<div id="site-content" class="m-content">
        <div class="m-bonus-point m-item m-flex-box">

            <div class="my-bonus flex-1">
                <div class="my-bonus-title m-flex-box">
                    <img  alt="" id="headImg"  :onerror="user_default" :src="user.head_img">
                    <p class="flex-1">我的积分</p>
                    <div class="my-exchange m-flex-box">
                        <img src="../assets/image/discovery/my-exchange.png" alt="">
                        <span class="color-27a0ff">我的兑换</span>
                    </div>
                </div>
                <h2 id="myIntegral">{{userPoint}}</h2>
            </div>

        </div>
        <div class="m-discovery-operate ">
            <ul class="m-flex-box">
                <li class="flex-1">
                    <img src="../assets/image/discovery/discovery-icon_1.png" alt="">
                    <p>签到有礼</p>
                </li>
                <li class="flex-1">
                    <img src="../assets/image/discovery/discovery-icon_2.png" alt="">
                    <p>邀请好友</p>
                </li>
                <li class="flex-1">
                    <img src="../assets/image/discovery/discovery-icon_3.png" alt="">
                    <p>实名认证</p>
                </li>
                <li class="flex-1">
                    <img src="../assets/image/discovery/discovery-icon_4.png" alt="">
                    <p>答题闯关</p>
                </li>
                <li class="flex-1">
                    <img src="../assets/image/discovery/discovery-icon_5.png" alt="">
                    <p>去投资</p>
                </li>
            </ul>
        </div>

        <div class="m-personal-list3 m-discovery-product">
          <div class="m-item m-item2">
             <div class="m-pull-right" style="color:#999">
                 更多
                 <img src="../assets/image/in.png">
             </div>
             <img src="../assets/image/discovery/discovery-icon_title.png">
             <span>商品兑换</span>
          </div>
            <div class="m-discovery-product-list">
                <ul>
                    <li  v-for="(item,index) in product_list" :key="index">
                        <div class="product-img m-flex-box">
                          <img v-lazy="item.pic_url" alt="">
                        </div>
                        <div class="m-discovery-product-info">
                            <p class="info-title">{{item.title}}</p>
                            <p class="info-point"><span>{{item.price}}</span>积分</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="txtList" class="list-holder" v-if="product_list.length>3">查看更多</div>
        </div>
    </div>
</template>

<script>
import loading from '../components/loading'
import {config} from '../api'
import Utils from '../utils'
import axios from '../axios'
import store from '../store'

export default {
  data () {
    return {
    	product_list: [],
        user_default: 'this.src="' + require('../assets/image/discovery/discovery-pic.png') + '"'
    }
  },
  computed: {
    user: function () {
        return  JSON.parse(store.state.user) || {head_img: ""}
    },
    userPoint: function () {
        return store.state.userPoint || "0"
    }
  }, 
  created() {
  	 axios.post(config.url_allItem,{
  	 	page: 1,
        type: 0
  	 }).then((res) => {
          console.log(res);
          var ret = res.data;
          if (ret && ret.errcode == "0") {
                var data = {
                    discovery_list: ret.data.All_items
                };
                if(data.discovery_list.length>8){
                  data.discovery_list = data.discovery_list.slice(0,8)
                }
                this.product_list = data.discovery_list
            } else {
                alert({
                    msg: '数据获取失败'
                });
            }
      });
     
  },
  // 通过路由守卫，监听重新进入当前组件state的值
  beforeRouteEnter  (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
        if (!store.state.userPoint) {
            axios.get(config.url_userIntegral).then((res) => {
                console.log(res)
                if (res.data.errcode == 0) {
                    store.dispatch('UserPoint',res.data.data.available)
                }
            })
        }
      })
  }
}
</script>

<style rel="stylesheet" scoped>
html,
body {
    background: #f5f5f5;
}

.m-bonus-point {
    background-color: #27a0ff;
    background-image: url(../assets/image/discovery/discovery-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: .6rem .8rem;
    height: 7.2rem
}

.my-bonus {
    background-image: url(../assets/image/discovery/discovery-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 7rem;
    width: 90%;
    margin-bottom: -3rem;
    text-align: center;
    border-radius: .5rem;
    padding: .7rem 0 .7rem .7rem;
    box-shadow: 0px -1px 4px rgba(117, 117, 117, 0.2);
}

.m-bonus-point p {
    color: #e7e7e7;
    font-size: .6rem;
    margin-bottom: 0;
    text-align: left;
}

.m-bonus-point .my-bonus-title {
    align-items: center;
    justify-content: flex-start;
}

.m-bonus-point .my-bonus-title>img {
    width: 1rem;
    border-radius: .5rem;
    display: inline-block;
    margin-right: .5rem
}

.my-exchange {
    background-image: url(../assets/image/discovery/my-exchange-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: .3rem
}

.my-exchange img {
    width: .6rem;
    display: inline-block;
    margin-right: .3rem
}

.my-exchange span {
    font-size: .5rem;
    line-height: 1
}

.m-bonus-point h2 {
    color: #fff;
    font-size: 2.3rem;
    font-weight: 500;
    padding: .5rem 0 1.5rem 0;
}

.m-discovery-swiper {
    margin-top: 2rem
}

.swiper-container img {
    width: 100%;
    display: block;
}
#headImg {
	width: .9rem;
	height: .9rem;
	/*border-radius: 1.5rem;*/
}
.m-discovery-operate {
    margin-top: 2rem;
    background-color: #fff
}

.m-discovery-operate ul li {
    text-align: center;
    padding: .5rem 0;
    font-size: .6rem
}

.m-discovery-operate ul li img {
    width: 1rem;
    display: inline-block;
}

.m-discovery-operate ul li p {
    margin-bottom: 0;
    font-size: .6rem;
    color: #000
}

.m-discovery-product {
    margin-top: .3rem;
    margin-bottom: 3rem;	
    border-top: none
}

.m-discovery-product.m-personal-list3 .m-item2 img {
    width: .7rem;
    margin-right: .2rem
}

.m-personal-list3 .m-item2 .m-pull-right img {
    width: .4rem;
}

.m-personal-list3 .m-item2 {
    border-bottom: none
}

.m-personal-list3 .m-item2>span {
    color: #000
}

.m-discovery-product.m-personal-list3 .m-pull-right .iconfont {
    font-size: .6rem
}

.m-discovery-product-list ul {
    display: flex;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
    padding-left: 1.5%;
}

.m-discovery-product-list ul li {
    flex: 0 0 48.5%;
    -webkit-box-flex: 0;
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -webkit-box-flex: 0;
    -moz-flex-shrink: 0;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    flex-basis: 48.5%;
    margin-right: 1.5%;
    margin-top: .3rem;
    background-color: #fff;
    overflow: hidden;
    width: 48.5%;
}

.m-discovery-product-list ul li .info-title {
    font-size: .7rem;
    margin: .2rem .3rem;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.product-img{
  height: 8rem;
  max-height: 8rem;
  width: 100%;
  text-align: center;
  overflow: hidden;
}
.product-img img{
  width: 80%;
  display: inline-block;
}
.m-discovery-product-list ul li .info-point {
    text-align: right;
    margin: .2rem .3rem;
    font-size: .6rem;
    color: #FF746B
}
</style>