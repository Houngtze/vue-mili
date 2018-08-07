<template>
  <div class="m-content" id="site-content">
      <div class="container">
        <loading :loadingShow="l_show"></loading>
       <div class="m-banner" id="swiper-box">
            <div class="msg-btn">
              <img src="../assets/image/home/msg.png" alt="">
            </div>
            <img src="../assets/image/home/bg_banner_01.png" class="bottom-image" alt="">
            <swiper :options="swiperOption" v-if="swiper_mes" id="swiper">
                <!-- <div class="swiper-slide before-slide"><img src="../assets/image/default/default-3.png"></div>  -->
                <swiper-slide v-for="item in swiper_mes" :key="item.id">
                    <img :src="item.img_url" alt="" onerror='this.src=\"../../image/default/default-3.png\"' style="height:inherit">
                </swiper-slide>
                <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
            </swiper>
            
        </div>
        <div class="m-banner-option m-flex-box">
                <div class="flex-1">
                    <img src="../assets/image/home/home_01.png">
                    <p>每日签到</p>
                </div>
                <div class="flex-1">
                    <img src="../assets/image/home/home_02.png">
                    <p>活动专区</p>
                </div>
                <div class="flex-1">
                    <img src="../assets/image/home/home_03.png">
                    <p>新手必看</p>
                </div>
                <div class="flex-1">
                    <img src="../assets/image/home/home_04.png">
                    <p>安全保障</p>
                </div>
            </div>
        <div class="content-swiper">
            <swiper :options="swiperOptionPro" v-if="swiper_product"  id="contentSwiper">
            <!-- <div class="swiper-slide before-slide"><img src="../assets/image/default/default-3.png"></div>  -->
                <swiper-slide v-for="item in swiper_product" :key="item.id">
                    <template v-if="item.loan_no">
                        <div class=" product-item loan-item">
                            <div class="product-item-header">
                              <span>■</span>
                              <span class="product-item-title">{{ item.name }}</span>
                              <span>■</span>
                            </div>
                            <div class="product-item-content">
                                <div class="m-progress"><s :style="'width:'+item.has_percent+'%'" id="num"><div class="point"><span><label>{{ item.has_percent }}%</label></span></div></s></div>
                            </div>
                            <div class="product-item-data">
                              <h1>{{ item.yearrate }}%</h1>
                              <p>预期年化收益率</p>
                              <div class="product-item-data-detail">
                                <div class="left flex-2">
                                  <h3 class="color-ff6459">{{ calculateAccount(item) }}</h3>
                                  <p>可投金额(元)</p>
                                </div>
                                <div class="middle"></div>
                                <div class="right flex-2">
                                  <h3 class="color-333">{{ item.range }}</h3>
                                  <p>项目期限(天)</p>
                                </div>
                              </div>
                              <div class="product-item-button">
                                    <button>立即投资</button>
                              </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="item.plan_no">
                          <div class="product-item plan-item" :key="item.id">
                            <div class="product-item-header">
                                  <span>■</span>
                                  <span class="product-item-title">{{ item.name }}</span>
                                  <span>■</span>
                              </div>
                              <div class="product-item-data">
                                  <h1 style="padding-top: 1rem">{{ item.yearrate }}%</h1>
                                  <p style="padding-bottom: .2rem">预期年化收益率</p>
                                  <div class="product-item-data-detail" style="padding:.85rem 0">
                                      <div class="left">
                                          <h3 class="color-ff6459">{{ calculateIncome(item) }} <img src="../assets/image/products/product-icon-index.png"></h3>
                                          <p>年化收益(元/月)</p>
                                      </div>
                                      <div class="right">
                                          <h3 class="color-333">{{ item.amount_min }}</h3>
                                          <p>起投金额(元)</p>
                                      </div>
                                  </div>
                                  <div class="product-item-button">
                                      <button>立即投资</button>
                                  </div>
                              </div>
                            </div>
                    </template>
                </swiper-slide>
            </swiper>
        </div>
        <div class="m-personal-list3 m-home-news">
            <div class="m-item m-item2 m-news-title">
                <div class="m-pull-right" style="color:#999">
                    更多
                    <img src="../assets/image/in.png">
                </div>
                <img src="../assets/image/home/home-news.png">
                <span>热点资讯</span>
            </div>
            <div class="m-new-list">
                  <div class="m-item m-item2 m-flex-box" v-for="item in news" :key="item.id">
                      <div class="left flex-2">
                          <p>{{ item.title }}</p>
                          <span>{{ item.created_at }}</span>
                      </div>
                      <div class="right flex-1">
                          <img onerror="this.src='../assets/image/default/default-2.png'" :src="item.head_img">
                      </div>
                  </div>
            </div>
        </div> 
      </div>
  </div>
</template>

<script type="ecmascript-6">
import tabBar from '../components/tabBar'
import loading from '../components/loading'
import {config} from '../api'
import Utils from '../utils'
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data (){ 
		return {
      swiperOption:{
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay:2850,
          autoplayDisableOnInteraction:false,
          // effect:'fade',
          touchMoveStopPropagation : false,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper  
          observeParents:true,//修改swiper的父元素时，自动初始化swiper  
          loop:false,
          // 要使用箭头函数，在swiper的事件函数内，this不指向当前vue实例，当然了也可以在data内先获取this来保存vue实例
          onTap:(e) => {
              this.getTopStories(e)
          }
      },
      swiperOptionPro:{
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: '2%',
          centeredSlides: true,
          freeModeSticky: true,
          autoplay:5000,
          autoplayDisableOnInteraction:false,
          // effect:'fade',
          touchMoveStopPropagation : false,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper  
          observeParents:true,//修改swiper的父元素时，自动初始化swiper  
          loop:false,
          // 要使用箭头函数，在swiper的事件函数内，this不指向当前vue实例，当然了也可以在data内先获取this来保存vue实例
          onTap:(e) => {
              this.getTopStories(e)
          }
      },
      swiper_mes:[],
      swiper_product: [],
      news: [],
      l_show: true
		} 
	},
  methods: {
    calculateAccount: function (item) {
      return Utils.AmountFormate(parseInt(item.amout)-parseInt(item.already_invest)+"")
    },
    calculateIncome: function (item) {
      return Utils.AmountFormate(((item.yearrate)*(parseInt(item.amount_min))*0.01/12).toFixed(2)+"")
    }
  },

  components: {
      tabBar,
      loading,
      swiper,
      swiperSlide
  },
  created() {
      axios.get(config.url_banner).then((res) => {
          console.log(res)
          this.swiper_mes = res.data.data;
          this.l_show = false
      })
      axios.get(config.url_homeProduct).then((res) => {
          console.log(res)
          this.swiper_product = res.data.data;
          this.l_show = false
      })
      axios.post(config.url_noticeList,{
        type: 'news',
        page: 1
      }).then((res) => {
          console.log(res)
          this.news = res.data.data.All_items;
      })
  }
	 
}
</script>

<style src="../assets/css/common.css"></style>
<style src="../assets/css/index.css"></style>
<style src="../assets/font/iconfont.css"></style>
<style rel="stylesheet">


html,
body {
  background: #f5f5f5;
  position: relative;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.container{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding-bottom: 70px;
}
.m-content{
  height: 100%;
}
.m-banner {
  background-color: #fff;
}
#swiper-box{
    position: relative;
}
#swiper{
    position: relative;
    height: 8rem;
    background-color: #fff
}
#swiper img{
    width: 100%;
    height: 100%
}
.swiper-pagination{
    bottom:-1px !important;
}
.swiper-title{
    display: block;
    width: 75%;
    font-size: 16px;
    position: absolute;
    top:135px;
    left: 10%;
    color:#fff;
    font-weight: bolder;
    text-align: center;
}
.swiper-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}

.bottom-image {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  z-index: 999999
}

.content-swiper {
  background-color: #f5f5f5;
  margin-top: 10px
}

.content-swiper .swiper-container {
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.content-swiper .swiper-slide {
  box-sizing: border-box;
  background: none
}
.content-swiper .swiper-slide .product-item{
  width: 94%;
  display: inline-block;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
}

.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: #fff;
  opacity: 1
}

.swiper-pagination-bullet {
  background: #bfbfbf;
  opacity: 0.5;
  margin: 0 5px
}

.swiper-slide img {
  width: 100%;
}

.m-banner-option {
  padding: 0;
  overflow: hidden;
  background: #fff
}

.msg-btn {
  position: absolute;
  right: .7rem;
  top: 1.5rem;
  z-index: 9999;
  width: 1.5rem
}

.msg-btn img {
  width: 1.2rem
}

.m-banner-option .flex-1 {
  text-align: center;
  padding-top: .3rem
}

.m-banner-option .flex-1 p {
  font-size: 0.6rem;
  padding: 0.1rem 0;
  margin-bottom: .4rem;
  line-height: 1;
  color: #333
}

.m-banner-option .flex-1 img {
  display: inline-block;
  width: 2rem;
}

.product-item {
  margin-bottom: 10px
}

.product-item-data-detail>div.left,
.product-item-data-detail>div.right {
  -webkit-box-flex: 2;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 2;
  /* OLD - Firefox 19- */
  -webkit-flex: 2;
  /* Chrome */
  -ms-flex: 2;
  /* IE 10 */
  flex: 2;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.product-item-content {
  padding-left: 1rem;
  padding-right: 1rem
}

.m-content.content-swiper {
  margin-top: 10px
}

.m-home-news {
  border-top: none;
  margin-top: .2rem
}

.m-news-title span {
  font-size: .8rem
}

.m-flex-box .right {
  overflow: hidden;
  height: 100%
}

.m-flex-box .right img {
  width: 100%;
}

.m-home-news .m-flex-box {
  align-items: flex-start;
  -webkit-align-items: flex-start;
  height: 5rem;
  border-top: 0;
}

.m-home-news .m-item .left {
  align-items: flex-start;
  -webkit-align-items: flex-start;
  padding-right: 12px;
  height: 100%;
  position: relative;
}

.m-home-news .m-item .left p {
  margin: 0;
  font-size: .75rem;
  color: #333
}

.m-home-news .m-item .left span {
  bottom: 0;
  position: absolute;
  font-size: .6rem;
  color: #999
}

.m-home-news .m-item .right img {
  height: 100%
}

#header {
  padding-top: 1rem;
  padding-bottom: 0;
  display: none;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10000000000
}


/*.swiper-lazy-preloader:after{
          display: none !important
        }*/

.product-item-header {
  border-bottom: 1px solid rgba(200, 200, 200, 0.3);
}

.exam-result {
  width: 80%;
  margin: 40% auto;
  position: relative;
}

.result-bg {
  width: 100;
  overflow: hidden;
  position: relative;
}

.result-bg .signin-detail {
  position: absolute;
  width: 100%;
  top: 17.5%;
  padding-right: 1rem;
  box-sizing: border-box;
  text-align: center;
}

.result-bg img {
  width: 100%;
}

.result-content {
  position: absolute;
  top: 1.5rem;
  width: 100%;
  text-align: center;
}

.result-content img {
  display: inline-block;
  width: 50%
}

.result-content p {
  color: #EAD27A;
  margin: .5rem 0;
  font-size: .7rem
}

.result-btn {
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  text-align: center;
}

.result-btn button {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 25%;
  height: 1rem;
  background-color: transparent !important;
  margin: 0 5%
}

</style>
