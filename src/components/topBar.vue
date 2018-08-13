<template>
	<div class="m-bar m-bar-nav" id="header" v-show="headerShow">
	  <a class="m-bar-nav-left"  v-if="backShow">&#xe61b;</a>
	  <h1 class="m-title" id="title">{{title}}</h1>
	</div>
</template>

<script>
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
}
</script>
<style src="../assets/css/common.css"></style>
<style src="../assets/css/index.css"></style>
<style rel="stylesheet">
#header{
	position:fixed;
	width: 100%;
	z-index:1000;
	top:0;
    height: 3rem;	
}
</style>