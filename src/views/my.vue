<template>
	<div class="m-content" id="site-content">
		<div id="islongin" v-if="isLogin">
			<div class="m-mine-info" id="hasLogin">
				<div class="info-header m-flex-box">
					<div class="left">
						<img id="userImg" :src="user.head_img" :onerror="user_default" alt="">
					</div>
					<div class="middle">
						<p id="nickName">{{user.user_name}}</p>
						<span id="authentication">
							{{user.statusInfo}}
						</span>
					</div>
					<div class="right flex-1" style="visibility: hidden">
						<img src="../assets/image/mine/icon/icon-mine_date.png" alt="">
					</div>
				</div>
				<div class="info-data">
					<div class="data-header">
						<h1 id="total">{{userAccount.total}}</h1>
						<p class="data-small-font">总资产(元)</p>
					</div>
					<div class="data-item data-flex">
						<div class="data-item-detail">
							<p id="available">{{userAccount.available}}</p>
							<span class="data-small-font">账户余额(元)</span>
						</div>
						<div class="data-item-detail">
							<p id="investment">{{userAccount.investment}}</p>
							<span class="data-small-font">在投本金(元)</span>
						</div>
						<div class="data-item-detail">
							<p id="allInterest">{{userAccount.interest}}</p>
							<span class="data-small-font">累计收益(元)</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="login" v-if="!isLogin">
			<div class="m-mine-info no-login">
				<p><span @click="toLogin()">登录 </span>/<span @click="toRegister()"> 注册</span></p>
			</div>
		</div>

		<div class="m-personal-list3 m-mine-list">
			<div class="m-item m-item2 m-mine-title" @click="toRegister">
				<div class="m-pull-right">
					<span class="iconfont"><img src="../assets/image/in.png"></span>
				</div>
				<img src="../assets/image/mine/icon/icon-mine_1.png">
				<span>充值</span>
			</div>
			<div class="m-item m-item2 m-mine-title margin-bottom">
				<div class="m-pull-right">
					<span class="iconfont"><img src="../assets/image/in.png"></span>
				</div>
				<img src="../assets/image/mine/icon/icon-mine_2.png">
				<span>提现</span>
			</div>
			<div class="m-item m-item2 m-mine-title" @click="toMyInvest">
				<div class="m-pull-right">
					<span class="iconfont"><img src="../assets/image/in.png"></span>
				</div>
				<img src="../assets/image/mine/icon/icon-mine_4.png">
				<span>我的投资</span>
			</div>
		</div>
				
<!-- 			<div style="width:100%;text-align:center;padding:10px 0">
		        </button>
				<button class="m-btn-yellow" tapmode="" @click="clearData">
		          清除数据
		        </button>
			</div>  -->
	</div>
</template>

<script>
import router from '../router'	
import store from '../store'
import { mapState } from 'vuex'
import axios from '../axios'
import {config} from '../api'
import Utils from '../utils'
export default {
  data () {
    return {
		user_default: 'this.src="' + require('../assets/image/discovery/discovery-pic.png') + '"'
    }
  },
  computed: {
  	isLogin: function () {
  		return store.state.token ? true : false
  	},
    // 认证状态判断
    user: function () {
      let user = JSON.parse(store.state.user) , status = user.status
      switch (status) {
      	case "1": user.statusInfo =  "已认证"; break;
      	case "2": user.statusInfo =  "认证不通过"; break;
      	case "3": user.statusInfo =  "认证中"; break;
      	case "0": user.statusInfo =  "未认证"; break;
      }
      user.user_name = user.user_name ? user.user_name : user.phone
	  return user
    },
    userAccount: function (){
    	return JSON.parse(store.state.userAcount)
    }
  }, 
  methods: {
    toLogin: function () {
		this.$router.push({name:'login'});
    },
    toRegister: function () {
    	this.$router.push({name:'register'});
    },
    clearData: function () {
    	store.dispatch('UserLogout');
    	scrollTo(0,0)
    },
    toMyInvest: function() {
    	this.$router.push({name:'myInvest'});
    }
  }
}
</script>

<style rel="stylesheet" scoped>
.m-content{
	margin-bottom: 3.5rem
}
.m-mine-info {
	background: #0F88E6;
	padding-top: 1.5rem
}

.info-header {
	padding: .5rem 1rem 0 1rem
}

.info-header .left {
	margin-right: .5rem;
}

.info-header .left img {
	width: 3rem;
	height: 3rem;
	border-radius: 1.5rem;
}

.info-header .middle {
	padding-left: .2rem;
	text-align: left;
}

.info-header .middle p {
	margin-bottom: 0;
	color: #fff;
	font-size: .8rem
}

.info-header .middle span {
	background-color: #5EAEE9;
	color: #fff;
	padding: 0 .4rem;
	display: inline-block;
	margin-top: .3rem;
	border-radius: .3rem
}

.info-header .right img {
	width: 1.3rem
}

.info-header img {
	display: inline-block;
}

.data-header {
	margin: .5rem 0 1rem 0;
}

.data-header h1 {
	font-weight: 400;
	margin-top: 0
}

.info-data {
	background: #0F88E6;
	text-align: center;
	color: #fff
}

.data-flex {
	display: box;
	/* OLD - Android 4.4- */
	display: -webkit-box;
	/* OLD - iOS 6-, Safari 3.1-6 */
	display: -moz-box;
	/* OLD - Firefox 19- (buggy but mostly works) */
	display: -ms-flexbox;
	/* TWEENER - IE 10 */
	display: -webkit-flex;
	/* NEW - Chrome */
	display: flex;
	/* NEW, Spec - Opera 12.1, Firefox 20+ */
	-webkit-align-items: center;
	justify-content: center;
	-webkit-justify-content: center
}

.data-small-font {
	font-size: .6rem;
	color: #CEEAFF;
	margin: 0
}

.data-detail {
	padding: .6rem .7rem;
}

.data-detail>div {
	-webkit-box-flex: 1;
	/* OLD - iOS 6-, Safari 3.1-6 */
	-moz-box-flex: 1;
	/* OLD - Firefox 19- */
	-webkit-flex: 1;
	/* Chrome */
	-ms-flex: 1;
	/* IE 10 */
	flex: 1;
	/* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.data-detail .left {
	text-align: left
}

.data-detail .right {
	text-align: right;
}

.data-item {
	background: #088CF3;
	padding-bottom: .5rem;
}

.data-item .data-item-detail {
	-webkit-box-flex: 1;
	/* OLD - iOS 6-, Safari 3.1-6 */
	-moz-box-flex: 1;
	/* OLD - Firefox 19- */
	-webkit-flex: 1;
	/* Chrome */
	-ms-flex: 1;
	/* IE 10 */
	flex: 1;
	/* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.data-item .data-item-detail p {
	margin: 0.5rem 0 .1rem 0;
	color: #fff
}

.margin-bottom {
	margin-bottom: .5rem;
}

.no-login.m-mine-info {
	text-align: center;
	padding: 4rem 0;
}

.no-login.m-mine-info p {
	color: #fff;
	background-color: #35ADF4;
	padding: .5rem 1rem;
	border-radius: 1rem;
	font-size: .8rem;
	display: inline-block;
	margin-bottom: 0
}

.m-mine-list .m-mine-title {
	padding: .7rem
}

.m-mine-list .m-mine-title.margin-bottom {
	border-bottom: none
}

.m-mine-list .m-mine-title>span {
	font-size: .7rem;
	color: #333;
	margin-left: .2rem
}
</style>