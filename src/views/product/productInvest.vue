<template>
<div class="m-content wrap" id="site-content">
  		<loading :loadingShow="l_show"></loading>
  		<topBar :title="'投资详情'" :backShow="true"></topBar>
        <div class="product-item">
            <div class="product-item-header">
                <span>■</span>
                <span class=" product-item-title" id="investName">{{detail.name}}</span>
                <span>■</span>
            </div>
            <div class="product-item-data" v-if="type=='sxb'">
                <div class="product-item-data-detail">
                    <div class="left">
                        <h3  id="investDays">{{detail.range}}</h3>
                        <p>项目期限(天)</p>
                    </div>
                    <div class="middle">
                        <h3 class="color-ff6459" id="investCaninvest">{{investCaninvest}}</h3>
                        <p>可投金额(元)</p>
                    </div>
                    <div class="right">
                        <h3 id="investMin">{{detail.amount_min}}</h3>
                        <p>起投金额(元)</p>
                    </div>
                </div>
            </div>
            <div class="product-item-data" v-if="type=='zcb'">
                <div class="product-item-data-detail">
                    <div class="left">
                        <h3  id="investRange">{{detail.range}}</h3>
                        <p>项目期限(月)</p>
                    </div>
                    <div class="middle">
                        <h3 class="color-ff6459" id="investIncome">{{investIncome}}</h3>
                        <p>万元预期收益(元)</p>
                    </div>
                    <div class="right">
                        <h3 id="investMin">{{detail.amount_min}}</h3>
                        <p>起投金额(元)</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-money">
          <div class="m-flex-box">
            <p class="product-money-title flex-1">账户余额：<span id="account">{{userAccount}}</span></p>
            <p class="product-money-info">预期收益：<span id="futureMoney">-</span></p>
          </div>
            <div class="product-money-content m-flex-box">
                <div class="left" id="moneyReduce" @click="reduce">
                    <img src="../../assets/image/products/reduce.png" alt="-">
                </div>
                <div class="middle">
                    <input type="number" name="" id="num" placeholder="" class="color-ff6459" onkeyup="this.value=parseInt(this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));if(isNaN(value))execCommand('undo');" oninput="this.value=parseInt(this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));if(isNaN(value))execCommand('undo');" v-model="InvestVal" readonly unselectable="on" onfocus="this.blur()">
                </div>
                <div class="right" id="moneyAdd" @click="add">
                    <img src="../../assets/image/products/add.png" alt="+">
                </div>
            </div>
            <p class="text">起投金额：<span id="startMoney">{{detail.amount_min}}</span>元起投，以<span id="unit">{{detail.amount_min}}</span>元的倍数递增。</p>
        </div>
        <div class="m-personal-list3 m-product-item">
            <div class="m-item m-item2" onclick="">
                <div class="m-pull-right">
                    <span id="repaytype">到期返还本息</span>
                </div>
                <span>回款方式</span>
            </div>
            <div class="m-item m-item2" id="useCoupon" @click="noOpen">
                <div class="m-pull-right m-flex-box" >
                    <span class="color-ff6459" id="coupon"></span>
                    <span class="iconfont">&#xe61a;</span>
                </div>
                <span>优惠券</span>
            </div>
        </div>
         <div class="m-bar-footer m-flex-box product-detail-button" id="nav">
	        <div class="up-line m-check">
	            <label id="check"><input type="checkbox" v-model="agreeCheck"><i></i></label>
	            <span>同意并阅读 <a href="#" class="color-27a0ff" onclick="openWin('agreement', {title : '相关协议', url : 'products/agreement.html'})">《相关协议》</a> </span>
	        </div>
	        <input type="hidden" id="couponData">
	        <input type="hidden" id="hongbao">
	        <input type="hidden" id="jiaxi">
	        <input type="hidden" id="xutou">
	        <a class="right" tapmode="active" id="nowInvest" @click="sumbitInvest">立即投资</a>
	    </div>
    </div>
</template>

<script>
import topBar from '../../components/topBar'	
import loading from '../../components/loading'
import axios from '../../axios'
import {config} from '../../api'
import Utils from '../../utils'
import store from '../../store'

export default {
  data () {
    return {
    	l_show: false,
    	id: '',
        type: '',
        detail: '',
        InvestVal: '',
        agreeCheck: false
    }
  },
  components: {
      loading,
      topBar
  },
  created() {

  },
  computed: {
	investIncome: function () {
        if (this.detail) {
            this.detail.yearrate = Number(this.detail.yearrate)
            this.detail.range = Number(this.detail.range)
            this.detail.income = (10000 * (Math.pow(1+(this.detail.yearrate) / 1200 , this.detail.range)))-10000;
            this.detail.income = this.detail.income.toFixed(2);
            return  this.detail.income
        }
    },
    now: function () {
        return Utils.getNowFormatDate()
    },
    investCaninvest: function() {
        if (this.detail) {
            return this.detail.caninvest = (parseInt(this.detail.amout) - parseInt(this.detail.already_invest)).toFixed(0)
        }
    },
    inverEnd: function() {
        var endDate = new Date(this.now.replace(".","-").replace(".","-"));
        endDate = endDate.setDate(endDate.getDate() + parseInt(this.detail.range));
        endDate = new Date(endDate);
        var m,d;
        m = endDate.getMonth() + 1;
        if (endDate.getMonth()<10){
          m = "0"+(endDate.getMonth() + 1)
        }
        d = endDate.getDate();
        if(endDate.getDate()<10){
          d = "0"+endDate.getDate()
        }
        return endDate.getFullYear() + "." + m + "." + d;
    },
    userAccount: function (){
    	let userAccount = JSON.parse(store.state.userAcount)
    	return userAccount.total
    }
  },
  methods: {
  	add: function(){
  		let amount_min = Number(this.detail.amount_min)
  		this.InvestVal = Number(this.InvestVal) +  amount_min
  		this.InvestVal = this.InvestVal.toFixed(2)
  	},
  	reduce: function(){
  		let amount_min = Number(this.detail.amount_min)
  		this.InvestVal = Number(this.InvestVal)
  		if (this.InvestVal <= amount_min) {
  			this.InvestVal = amount_min;
  			this.InvestVal = this.InvestVal.toFixed(2)
  			return false
  		}
  		this.InvestVal = this.InvestVal - amount_min
  		this.InvestVal = this.InvestVal.toFixed(2)
  	},
  	sumbitInvest: function() {
  		if (!this.agreeCheck) {
  			Utils.toast("请详细阅读相关协议");
  			return false
  		}
		this.l_show = true;
		var url = this.type == "sxb" ? config.url_investCasualStore : config.url_investStoreTreasure
		console.log(this.id)
		console.log(this.InvestVal)
  		axios.post(url,{
        	invest_id: this.id,
        	money: this.InvestVal,
        	user_coupon_id: "0",
        	action: "new",
        	tend_id: "0"
        }).then(response=>{
        	console.log(response)
            let ret = response.data;
            this.l_show = false;
            if (ret.errcode == 0) { 
                Utils.toast("您已完成此类型理财产品的投资");
                axios.get(config.url_user_account).then(response=>{
                    console.log(response.data.data)
                    if (response.data.data) {
                        store.dispatch('UserAccount',response.data.data)
                    }
                })
                setTimeOut(function() {
                    this.$router.replace({name:'myInvest',query:{ type: this.type }});
                },2000)
            }else{
                Utils.toast("投资产品出错，请稍后重试");
            }
        })
        
  	},
    noOpen: function() {
      Utils.toast("优惠券功能暂未开放，请移至APP使用")
    }	
  },
  // 路由守卫，通过url上的参数获取id和类型
  beforeRouteEnter  (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
        vm.l_show = true;
        vm.id = to.query.id;
        vm.type = to.query.type;
        let url = to.query.type == "sxb" ? config.url_casualStoreDetail : config.url_intStoreDetail
        axios.post(url,{
        invest_id: to.query.id
        }).then(response=>{
            let ret = response.data;
            vm.l_show = false;
            if (ret.errcode == 0) {
                console.log(ret)
                vm.detail = ret.data,
                vm.InvestVal = ret.data.amount_min
            }else{
                Utils.toast("投资产品不存在");
                vm.detail = ""
            }
        })
      })
  }
}
</script>

<style scoped>

.product-item {
    border-radius: 0;
    margin-top: 2.5rem;
}

.product-item-data {
    padding: .3rem 0
}


.detail-item {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
}

.detail-item .detail-item-flex {
    margin-right: 1rem;
}

.detail-item .detail-item-flex>p {
    color: #FF6459
}


.product-detail-button {
    border-top: 1px solid rgba(239, 239, 239, 1);
    z-index: 9999999999999999999;
    position: fixed;
    padding-top: 1.2rem
}

.product-detail-button .left {
    background: #fff;
    -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1; /* OLD - Firefox 19- */
    -webkit-flex: 1; /* Chrome */
    -ms-flex: 1; /* IE 10 */
    flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.product-detail-button .left {
    color: #27a0ff;
}

.product-detail-button>a {
  -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1; /* OLD - Firefox 19- */
  -webkit-flex: 1; /* Chrome */
  -ms-flex: 1; /* IE 10 */
  flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
    width: 100%;
    text-align: center;
    padding: .6rem 0;
    font-size: .8rem
}

.product-detail-button .right {
    background: #27a0ff;
    -webkit-box-flex: 5; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 5; /* OLD - Firefox 19- */
    -webkit-flex: 5; /* Chrome */
    -ms-flex: 5; /* IE 10 */
    flex: 5; /* NEW, Spec - Opera 12.1, Firefox 20+ */
    color: #fff;
    text-align: center;
}

.up-line {
    position: absolute;
    top: 0px;
    width: 100%;
    text-align: center;
}

.up-line span {
    margin: 0 .5rem
}

.up-line .line {
    width: 30%;
    height: 1px;
    background-color: #ccc;
    display: inline-block;
    vertical-align: middle
}

.product-item .product-item-data-detail {
    padding: .5rem .5rem 0 .5rem
}

.product-item-detail {
    background-color: #fff;
    overflow: hidden;
    margin-top: .5rem;
}

.product-item-detail-title {
    padding: .5rem;
    font-size: .7rem;
    color: #000;
    border-bottom: 1px solid #ddd;
}

.product-item-detail-title label {
    color: #ddd;
    font-size: .6rem
}

.product-item-detail .product-item-data-detail {
    text-align: center;
    padding: .2rem 0
}

.product-item-detail .product-item-data-detail h3 {
    font-size: .6rem
}

.m-content {
    height: 100%
}

.product-money {
    background: #fff;
    margin-top: .5rem;
}

.product-money-title {
    padding: .5rem;
    color: #000;
    margin-bottom: 0;
    margin-right: 1rem;
    text-align: left;
}
.product-money-info{
    padding: .5rem;
    color: #000;
    margin-bottom: 0;
    text-align: right;
    font-size: .6rem;
    color: #999;
}
.product-money-info span{
  color:#ff6459
}
.product-money .text {
    padding-left: .5rem;
    font-size: .6rem;
    padding-bottom: .5rem
}

.product-money-content {
    padding: 0 1rem .5rem;
    clear: both;
}

.product-money-content .left,
.product-money-content .right {
    background-color: #ccc;
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
}

.product-money-content>div img {
    line-height: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    display: -webkit-flex;
    display: box; /* OLD - Android 4.4- */
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
}

.product-money-content .middle {
    border-bottom: 1px solid rgba(180, 180, 180, 0.3);
    padding: .5rem 0;
    -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1; /* OLD - Firefox 19- */
    -webkit-flex: 1; /* Chrome */
    -ms-flex: 1; /* IE 10 */
    flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.product-money-content .middle input {
    text-align: center;
    font-size: 1.5rem;
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
    line-height: normal;
}

.product-money-content .middle input::-webkit-input-placeholder {
    color: #ff6459;
    font-size: 1.5rem
}

.m-product-item {
    margin-top: .5rem
}
</style>