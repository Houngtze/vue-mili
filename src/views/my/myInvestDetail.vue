<template>
  <div id="site-content" class="m-content ">
  		<loading :loadingShow="l_show"></loading>
  		<topBar :title="'我的投资'" :backShow="true"></topBar>
        <div class="m-item-title" style="margin-top: 2.5rem">
            <div class="left">
                项目名称
            </div>
            <div class="right" id="invest_name">{{data.name}}</div>
        </div>
        <div class="m-item-title">
            <div class="left">
                回款方式
            </div>
            <div class="right" id="interest_type" v-text="interest_type(data.interest_type)"></div>
        </div>
        <div class="m-item-title">
            <div class="left">
                投资类型
            </div>
            <div class="right" id="type">{{investType}}</div>
        </div>
        <div class="m-item-title margin-bottom">
            <div class="left">
                项目状态
            </div>
            <div class="right" id="status" v-text="statusInfo(data.status)"></div>
        </div>
        <div class="m-item-title">
            <div class="left">
                本金：
            </div>
            <div class="right" id="amount">{{data.amount}}</div>
        </div>
        <div class="m-item-title">
            <div class="left">
                预期年化收益率：
            </div>
            <div class="right" id="yearrate">{{data.yearrate}}</div>
        </div>
        <div class="m-item-title">
            <div class="left">
                项目收益：
            </div>
            <div class="right" id="interest">{{data.interest}}</div>
        </div>
        <div class="m-item-title">
            <div class="left">
                投资日期：
            </div>
            <div class="right" id="start_date">{{data.start_date}}</div>
        </div>
        <div class="m-item-title">
            <div class="left">
                回款日期：
            </div>
            <div class="right" id="end_date">{{data.end_date}}</div>
        </div>
    </div>
</template>

<script>
import topBar from '../../components/topBar'	
import loading from '../../components/loading'
import axios from '../../axios'
import {config} from '../../api'
import Utils from '../../utils'
export default {
  data () {
    return {
    	data: '',
    	l_show: false,
    	type: ''
    }
  },
  created() {

  },
  components: {
	  loading,
	  topBar
  },
  methods: {
    statusInfo: function(status) {
  		return status == 1 ? "收益中" : "已回款"
	 },
	 interest_type: function(type){
	 	return type == "last_pay" ? "到期还本付息" : "分期付息"
	 }
  },
   computed: {
	investType: function() {
		return this.type == 'loan' ? "随心宝": "整存宝"
	}
  },
  // 路由守卫，通过url上的参数获取id和类型
  beforeRouteEnter  (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
        vm.l_show = true;
        vm.type = to.query.type
        axios.post(config.url_hasInevestDetail,{
        	id: to.query.id,
        	action: to.query.type
        }).then(response=>{
            let ret = response.data;
            vm.l_show = false;
            console.log(ret)
            if (ret.errcode == 0) {
            	vm.data = ret.data

            }
        })
     })
  }
}
</script>

<style>

</style>