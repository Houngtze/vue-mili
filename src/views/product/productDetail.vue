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
            <div class="product-item-data">
                <h1 id="investYearrate">{{detail.yearrate}}%</h1>
                <p>预期年化收益率</p>
                <div class="product-item-data-detail" v-if="type=='sxb'">
                    <div class="left">
                        <h3 id="investDays">{{detail.range}}</h3>
                        <p>项目期限(天)</p>
                    </div>
                    <div class="middle">
                        <h3 class="color-ff6459" id="investCaninvest">{{investCaninvest}}</h3>
                        <p>可投金额(元)</p>
                    </div>
                    <div class="right">
                        <h3 id="investAmoutMin">{{detail.amount_min}}</h3>
                        <p>起投金额(元)</p>
                    </div>
                </div>
                <div class="product-item-data-detail" v-if="type=='zcb'">
                    <div class="left">
                        <h3 class="color-333" id="investRange">{{detail.range}}</h3>
                        <p>项目期限(月)</p>
                    </div>
                    <div class="middle">
                        <h3 class="color-ff6459" id="investIncome">{{investIncome}}</h3>
                        <p>万元预期收益(元)</p>
                    </div>
                    <div class="right">
                        <h3 id="investAmoutMin">{{detail.amount_min}}</h3>
                        <p>起投金额(元)</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-item-detail">
            <div class="product-item-detail-title">
                <div class="m-pull-right">
                    <label id="repaytype">到期返还本息</label>
                </div>
                <span style="float: left;">回款方式</span>
            </div>
            <div class="product-item-data-detail" v-if="type=='sxb'">
                <div class="left">
                    <img src="../../assets/image/products/product-icon_1.png" alt="">
                    <h3>现在投资</h3>
                    <p id="investBegin">{{now}}</p>
                </div>
                <div class="middle">
                    <img src="../../assets/image/products/product-icon_2.png" alt="">
                    <h3>产生收益</h3>
                    <p id="investStart">{{now}}</p>
                </div>
                <div class="right">
                    <img src="../../assets/image/products/product-icon_3.png" alt="">
                    <h3>本期到期</h3>
                    <p id="investEnd">{{inverEnd}}</p>
                </div>
            </div>
            <div class="product-item-data-detail" v-if="type=='zcb'">
                <div class="left">
                    <img src="../../assets/image/products/product-icon_1.png" alt="">
                    <h3>立即加入</h3>
                    <p id="investMin">{{detail.amount_min}}元起投</p>
                </div>
                <div class="middle">
                  <img src="../../assets/image/products/product-icon_4.png" alt="">
                    <h3>投资成功</h3>
                    <p>当日计息</p>
                </div>
                <div class="right">
                  <img src="../../assets/image/products/product-icon_5.png" alt="">
                    <h3 id="investLock">锁定{{detail.range}}个月</h3>
                    <p id="investRepy">{{detail.repaytype}}</p>
                </div>
            </div>
        </div>
<!--         <div class="up-line">
            <div class="line"></div>
            <span>上滑查看详情</span>
            <div class="line"></div>
        </div> -->
        <div class="m-bar-footer m-flex-box product-detail-button" id="nav">
	        <a class="left" id="showCalculate" tapmode="active"><img src="../../assets/image/products/product-icon_cal.png" alt=""></a>
	        <a class="right" tapmode="active" id="toInvest" @click="toInvest(id,type)">立即投资</a>
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
    	l_show: true,
        id: '',
        type: '',
        detail: ''
    }
  },
  components: {
      loading,
      topBar
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
    now: function () {
        return Utils.getNowFormatDate()
    }
  },        
  created() {
  },
  methods: {
    toInvest: function (id,type){
        this.$router.push({name:'productInvest',query:{ id: id , type: type }});
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
                vm.detail = ret.data
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
.m-content{
	height: 100%;
	overflow: hidden;
    margin-top: 2.5rem
}
html {
    padding-bottom: 0;
    height: 100%;
    overflow: hidden;
    background: #f0f0f0;
}

.product-item-content {
    width: 100%;
    padding: 1.7rem .7rem 0 .7rem;
}

html,
body {
    background: #f0f0f0;
}

body {
    height: 100%;
    overflow: hidden;
    -webkit-transition: all .3s linear;
    transition: all .3s linear;
}

.clearfix:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
}

.clearfix {
    *zoom: 1;
}

.product-item {
    border-radius: 0;
    padding-bottom: .7rem
}

.product-item-data {
    padding: .3rem 0 0 0
}

.product-item-header {
    position: relative;
}

.product-item-header:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #f0f0f0;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
}

.detail-item {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
}

.detail-item .detail-item-flex {
    margin-right: 1rem;
}

.detail-item .detail-item-flex p {
    text-align: center;
}

.product-detail-button {
    border-top: 1px solid rgba(239, 239, 239, 1);
    z-index: 99;
    align-items: stretch;
    ;
}

.product-detail-button .left {
    background: #006FC1;
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
    text-align: center;
    padding: 0;
    display: -webkit-flex;
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
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    padding: .55rem 0;
}

.product-detail-button .left img {
    width: 1.3rem;
    height: 1.3rem;
    display: inline-block;
    line-height: 1
}

.product-detail-button a {
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
    width: 100%;
    text-align: center;
    padding: .6rem 0;
    font-size: .8rem
}

.product-detail-button .right {
    background: #27a0ff;
    -webkit-box-flex: 5;
    /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 5;
    /* OLD - Firefox 19- */
    -webkit-flex: 5;
    /* Chrome */
    -ms-flex: 5;
    /* IE 10 */
    flex: 5;
    /* NEW, Spec - Opera 12.1, Firefox 20+ */
    color: #fff;
    text-align: center;
    line-height: 1.2rem;
}

.up-line {
    position: fixed;
    bottom: 2.8rem;
    width: 100%;
    text-align: center;
}

.up-line span {
    margin: 0 .5rem;
    color: #999
}

.up-line .line {
    width: 32%;
    height: 1px;
    background-color: #ccc;
    display: inline-block;
    vertical-align: middle
}

.product-item .product-item-data-detail {
    padding: .7rem .5rem 0 .5rem
}

.product-item-detail {
    background-color: #fff;
    overflow: hidden;
    margin-top: .5rem;
}

.product-item-detail-title {
    overflow: hidden;
    padding: .5rem;
    font-size: .7rem;
    color: #000;
    border-bottom: 1px solid #ddd;
}

.product-item-detail-title label {
    color: #999;
    font-size: .6rem
}

.product-item-detail .product-item-data-detail {
    text-align: center;
    padding: .5rem 0 .4rem 0
}

.product-item-detail .product-item-data-detail img {
    width: 2rem;
    display: inline-block;
    margin-bottom: .3rem;
}

.product-item-detail .product-item-data-detail h3 {
    font-size: .6rem;
    margin-bottom: .1rem;
    font-weight: 400;
    color: #333
}

.product-item-detail .product-item-data-detail p {
    font-size: .6rem;
    color: #999
}

.m-content {
    height: 100%
}
</style>