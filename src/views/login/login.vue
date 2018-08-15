<template>
<div class="m-content" >
		<loading :loadingShow="l_show"></loading>
	  	<topBar :title="'登陆'" :backShow="true"></topBar>
		<div class="m-content-padded2">
			<div class="m-logo">
					<img src="../../assets/image/login_register/logo.png" style="width:50%">
			</div>
			<div class="m-login">
				<div class="m-item m-clearfix border-bottom no-border no-left-icon">
					<span class="iconfont m-pull-left"><img src="../../assets/image/login_register/icon/login_icon_1.png" alt=""></span>
					<input id="phone" type="number" pattern="[0-9]*" placeholder="请输入手机号" oninput="if(value.length>11)value=value.slice(0,11)" v-model="phone" />
				</div>
				<div class="m-item m-clearfix border-bottom no-border no-left-icon">
					<span class="iconfont m-pull-left"><img src="../../assets/image/login_register/icon/login_icon_2.png" alt=""></span>
					<input id="password" type="password" placeholder="请输入登录密码" oninput="if(value.length>32)value=value.slice(0,32)" v-model="password"/>
				</div>
			</div>
			<button type="button" class="m-btn m-btn-blue m-h4 m-btn-block" id="loginBtn" @click="submitForm">登录</button>
		</div>
		<div class="m-bar-footer">
			<a tapmode="">忘记密码</a>
			<a tapmode="">找回帐号</a>
		</div>
	</div>
	
</template>

<script>
import topBar from '../../components/topBar'	
import loading from '../../components/loading'
import {config} from '../../api'
import Utils from '../../utils'
import axios from '../../axios'
import store from '../../store'

export default {
  data () {
    return {
    	phone: '',
    	password: '',
    	l_show: false
    }
  },
  components: {
      loading,
      topBar
  },
  created() {
  	store.dispatch('UserLogout')
  },
  mounted() {
  	
  },
  methods: {
    submitForm() {
       if (!Utils.checkPhone(this.phone)) {
       	Utils.toast("手机号码格式有误");
       	return false
       }
       // if (!Utils.checkPhone(this.password)) {
       // 	Utils.toast("密码格式有误");
       // 	return false
       // }
       this.l_show = true
       const phone = this.phone;
       const password = Base64.encode(this.password);
       axios.post(config.url_login,{
		phone: phone,
		password: password,
		deviceId: "123"
       }).then(response=>{
		    console.log(response);
		    let ret = response.data;
		    this.l_show = false;
		    if (ret.errcode == 0) {
		    	store.dispatch('UserLogin',ret.data.token.access_token)
		    	store.dispatch('User',ret.data)
		    	this.$router.replace('/my')
		    }else{
		    	Utils.toast(ret.msg);
		    	return false
		    }
		    
	   })
  	},
  }
}
</script>

<style rel="stylesheet" scoped>

.m-content{
	margin-top: 5rem
}
.m-login {
	margin-bottom: 1rem
}

.m-login .m-item.no-border {
	padding-top: .1rem;
	padding-bottom: .1rem;
	margin-bottom: .1rem;
	background: #f5f5f5
}

#login_frame .with-line {
	width: 100%;
	font-size: 16px;
	color: #333333;
	margin: 0 auto;
	position: relative;
	text-align: center
}

#login_frame .with-line:before {
	content: "";
	border-top: 1px solid #DF3C3E;
	display: block;
	position: absolute;
	width: 32%;
	top: 10px;
	left: 20px
}

#login_frame .with-line:after {
	content: "";
	border-top: 1px solid #DF3C3E;
	display: block;
	position: absolute;
	width: 32%;
	top: 10px;
	right: 20px
}

.iconfont.m-pull-right.hide {
	display: none;
	font-size: 1rem
}

.show {
	display: block;
}

.m-clearfix a h5 {
	color: #0F88E6
}

.m-login .m-item input {
	margin-left: 1.8rem;
	background: #f5f5f5
}
.m-login .m-item .iconfont.m-pull-right {
	font-size: 1rem
}
.m-bar-footer{
	position: relative;;
	width: 100%;
	/* margin-top: 50%; */
	text-align: right;
	padding-right: 5%;
}
.m-bar-footer a{
	display: inline-block;
	text-align: center;
	color: #27A0FF;
	font-size: .6rem;

}
.m-bar-footer a:first-child{
	margin-right: .5rem;
	padding-right: .5rem;
	border-right: 1px solid #27A0FF
}
</style>