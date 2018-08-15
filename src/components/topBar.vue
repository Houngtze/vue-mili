<template>
	<div class="m-bar m-bar-nav" id="header" v-show="headerShow">
	  <a class="m-bar-nav-left"  v-if="backShow" @click="goBack">&#xe61b;</a>
	  <h1 class="m-title" id="title">{{title}}</h1>
	</div>
</template>

<script>
import router from '../router'
export default {
	data () {
	return {
		}
	},
	props: {
	  headerShow: {  // 必须提供字段
	    default: true
	  },
	  backShow: {
			default: true
	  },
	  title: {
	  	default: "米粒理财"
	  }
	},
	methods: {
	goBack: function () {
	       this.$router.back()
		}
	}
}
</script>
<style rel="stylesheet" scoped>
.m-bar {
    position: relative;
    z-index: 10;
    background-color: #0F88E6;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    width: 100%;
    padding: 0;
    line-height: 0;
}

.m-bar.fixed {
    position: fixed
}

.m-bar.fixed~.m-content {
    /*padding-top: 44px*/
}

.m-bar .m-title {
    display: inline-block;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    text-align: center;
    position: relative;
    font-weight: bold;
    margin: 0;
    z-index: 1;
    font-size: .9rem;
    padding: .9rem 44px .7rem 44px;
    font-weight: 500
}

.m-bar .m-title .logo {
    display: block;
    margin: 12px auto;
}

.m-bar-nav .m-bar-nav-right {
    left: auto;
    right: 0;
    font-size: .7rem
}

.m-bar-nav .m-bar-nav-right2 {
    width: 88px;
    font-size: 0.8rem;
    z-index: 100;
    left: auto;
    right: 0
}

.m-bar-header-secondary~.m-content {
    padding-top: 88rpx
}
#header{
	position:fixed;
	width: 100%;
	z-index:1000;
	top:0;	
}
</style>