<template>
	<div id="site-content " class="m-content">
	  	<loading :loadingShow="l_show"></loading>
	  	<topBar :title="'投资产品'" :backShow="false"></topBar>
        <div>
            <div class="m-tab" style="background-color:#fff;position:fixed;width: 100%;z-index:1000;top:2.5rem">
                <a :class="{'m-active':tab_show}" @click="tabShow"><span>随心宝</span></a>
                <a :class="{'m-active':!tab_show}" @click="tabShow"><span>整存宝</span></a>
            </div>
            
            <div id="itme1" class="itme m-tab-content" style="padding-top:5.3rem;overflow:hidden;margin-bottom: 3rem;" v-show="tab_show">
	            <div class="tab-conent">
	                <div class="product-item loan-header" @click="goDetail(sxb_head.id,'sxb')">
	                    <div class="product-item-header">
	                        <span>■</span>
	                        <span class=" product-item-title">{{sxb_head.name}}</span>
	                        <span>■</span>
	                    </div>
	                    <div class="product-item-content">
	                        <div class="m-progress">
	                        	<s :style="progressTran" id="num">
	                        		<div class="point">
	                        			<span>
	                        				<label>{{sxb_head.has_percent}}%</label>
	                        			</span>
	                        		</div>
	                        	</s>
	                        </div>
	                    </div>
	                    <div class="product-item-data">
	                        <h1>{{sxb_head.yearrate}}%</h1>
	                        <p>预期年化收益率</p>
	                        <div class="product-item-data-detail">
	                            <div class="left">
	                                <h3 class="color-ff6459">{{sxb_head.caninvest}}</h3>
	                                <p>可投金额(元)</p>
	                            </div>
	                            <div class="middle">
	                                <h3>{{sxb_head.amount_min}}</h3>
	                                <p>起投金额(元)</p>
	                            </div>
	                            <div class="right">
	                                <h3>{{sxb_head.range}}</h3>
	                                <p>项目期限(天)</p>
	                            </div>
	                        </div>
	                        <div class="product-item-button">
	                            <button tapmode="active">立即投资</button>
	                        </div>
	                    </div>
	                </div>
	                <div class="product-list loan-list">
	                    <ul>
	                        <li v-for="(item,index) in sxb_list" :key="item.id" @click="goDetail(item.id,'sxb')">
	                            <div class="product-list-item-header product-item-header">
	                                <span>■</span>
	                                <span class=" product-item-title">{{item.name}}</span>
	                            </div>
	                            <div class="product-list-item-detail product-item-data-detail">
	                                <div class="left">
	                                    <h3 class="color-ff6459">{{item.yearrate}}%</h3>
	                                    <p>预期年化收益率</p>
	                                </div>
	                                <div class="right">
	                                    <h3>{{item.range}}</h3>
	                                    <p>项目期限(天)</p>
	                                </div>
	                                <div class="middle">
	                                    
	                                </div>
	                            </div>
	                            <div class="product-list-item-detail-info">
	                                <p>{{item.amount_min}}元起投</p>
	                                <p>可投金额：{{item.caninvest}}元</p>
	                            </div>
	                        </li>
	                    </ul>
	                </div>
	            </div>
	        </div>

            <div id="itme2" class="itme m-tab-content" style="padding-top:5.3rem;overflow:hidden;margin-bottom: 3rem;" v-show="!tab_show">
	            <div class="tab-conent">
	                <div class="product-item plan-header"  @click="goDetail(zcb_head.id,'zcb')">
	                    <div class="product-item-header">
	                        <span>■</span>
	                        <span class=" product-item-title">{{zcb_head.name}}</span>
	                        <span>■</span>
	                    </div>
	                    <div class="product-item-data">
	                        <h1>{{zcb_head.yearrate}}%</h1>
	                        <p>预期年化收益率</p>
	                        <div class="product-item-data-detail">
	                            <div class="left">
	                                <h3 class="color-ff6459">{{zcb_head.income}}<img src="../assets/image/products/product-icon-index.png"></h3>
	                                <p>万元预期收益(元)</p>
	                            </div>
	                            <div class="middle"></div>
	                            <div class="right">
	                                <h3>{{zcb_head.amount_min}}</h3>
	                                <p>起投金额(元)</p>
	                            </div>
	                        </div>
	                        <div class="product-item-button">
	                            <button tapmode="active">立即投资</button>
	                        </div>
	                    </div>
	                </div>
	                <div class="product-list plan-list">
	                    <ul>
                            <li v-for="(item,index) in zcb_list" :key="item.id"  @click="goDetail(item.id,'zcb')">
                                <div class="product-list-item-header product-item-header">
                                    <span>■</span>
                                    <span class=" product-item-title">{{item.name}}</span><label v-if="item.range!=1">可复利</label>
                                </div>
                                <div class="product-list-item-detail product-item-data-detail padding-5">
                                    <div class="left">
                                        <h3 class="color-ff6459">{{item.income}}<img src="../assets/image/products/product-icon-index.png"></h3>
                                        <p>万元预期收益(元)</p>
                                    </div>
                                    <div class="right">
                                        <h3 class="color-ff6459">{{item.yearrate}}%</h3>
                                        <p>预期年化收益率</p>
                                    </div>
                                    <div class="middle">
                                        <a>立即投资</a>
                                    </div>
                                </div>
                                <div class="product-list-item-detail-info">
                                    <p>起投金额：{{item.amount_min}}元</p>
                                    <p>单人最高投资限额{{item.amount_max}}元</p>
                                </div>
                            </li>
	                    </ul>
	                </div>
	            </div>
        	</div>

        </div>
    </div>
</template>

<script>
import topBar from '../components/topBar'
import loading from '../components/loading'
import {config} from '../api'
import Utils from '../utils'
import axios from '../axios'
export default {
  data () {
    return {
    	sxb_list: [],
    	zcb_list: [],
    	sxb_head: '',
    	zcb_head: '',
    	progressTran: '',
    	l_show: true,
    	tab_show: true,
    	tabActive1: "m-active",
    	tabActive2: ""
    }
  },
  components: {
      loading,
      topBar
  },
  created() {
     axios.get(config.url_casualStoreTreasure).then((res) => {
          
          var ret = res.data
          console.log("随心宝："+ret);
          if (ret.errcode == 0) {
                console.log("个数" + ret.data.length);
                var head_data, data_list = [];
            if (ret.data.length > 0) {
                head_data = ret.data[0];
                head_data.yearrate = head_data.yearrate
                head_data.caninvest = (parseInt(head_data.amout) - parseInt(head_data.already_invest)).toFixed(0)

                this.progressTran = { width: head_data.has_percent + '%' }
                this.sxb_head = head_data
                if (ret.data.length > 1) {
                    for (var i = 1; i < ret.data.length; i++) {
                        ret.data[i].statusinfo = "";
                        if (ret.data[i].status == 4) {
                            continue;
                        }
                        if (ret.data[i].status == 2) {
                            ret.data[i].statusinfo = "item-over"
                        }
                        if (ret.data[i].status == 3) {
                            ret.data[i].statusinfo = "item-over"
                        }
                        ret.data[i].yearrate = ret.data[i].yearrate
                        ret.data[i].caninvest = (parseInt(ret.data[i].amout) - parseInt(ret.data[i].already_invest)).toFixed(0)
                        data_list.push(ret.data[i])
                    }
                    console.log(data_list)
                    this.sxb_list = data_list;
                    this.l_show = false
                }
            }else {
                
            }
        }
      }).catch(err =>{
        this.l_show = false
      });
     axios.get(config.url_intStoreTreasure).then((res) => {
     	var ret = res.data;
     	console.log("整存宝"+ret);
     	if (ret.errcode == 0) {
                // console.log(JSON.stringify(ret));
        var head_data, data_list = [];
        if (ret.data.length > 0) {
            head_data = ret.data[0];
            head_data.yearrate = head_data.yearrate
            head_data.income = (10000 * (Math.pow(1+(head_data.yearrate) / 1200 , head_data.range)))-10000;
            head_data.income = head_data.income.toFixed(2);
            this.zcb_head = head_data
            if (ret.data.length > 1) {
                for (var i = 1; i < ret.data.length; i++) {
                    ret.data[i].statusinfo = "";
                    ret.data[i].yearrate = ret.data[i].yearrate
                    ret.data[i].income = (10000 * (Math.pow(1+(ret.data[i].yearrate) / 1200 , ret.data[i].range)))-10000;
                    ret.data[i].income = ret.data[i].income.toFixed(2)
                    data_list.push(ret.data[i])
                }
                
            }
            console.log(data_list)
            this.zcb_list = data_list;
            this.l_show = false
        }
     }
  }).catch(err =>{
        this.l_show = false
      })
 },
  methods: {
    tabShow: function () {
        this.tab_show==true?this.tab_show=false:this.tab_show=true;
    },
    goDetail: function (id, type) {
        this.$router.push({name:'productDetail',query:{ id: id , type: type }});
    }
  }
}
</script>

<style rel="stylesheet" scoped>
html,
body {
    background: #f5f5f5;
    padding-bottom: 50px
}
.m-tab a.m-active{
    border-bottom: 3px solid #0F88E6;
}
.product-item-content {
    width: 100%;
    padding: 1.7rem 1rem 0 1rem;
}

.product-list {
    margin-top: .35rem;
}

.product-list li {
    background: #fff;
    margin-bottom: .5rem
}

.product-item-data>h1 {
    margin: .6rem 0 .4rem 0;
    font-weight: 500
}

.product-item-data .product-item-data-detail {
    padding-top: .6rem
}

#itme2 .product-item-data-detail {
    padding-top: 0rem
}

#itme2 .product-list .product-item-data-detail {
    padding-top: .5rem
}

.product-list-item-header.product-item-header {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    padding: .5rem .7rem 0 .7rem;
    width: 100%
}

.product-list-item-header.product-item-header .product-item-title {
    font-size: .7rem
}

.product-list-item-header.product-item-header label {
    display: inline-block;
    border: 1px solid #ff6459;
    padding: 3px .1rem 1px .1rem;
    line-height: 1;
    border-radius: .2rem;
    color: #EE6E60;
    font-size: .5rem;
    margin-left: .3rem;
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
}

.product-list-item-header.product-item-header::after {
    display: none
}

#itme2 .product-item-data-detail>div.left,
#itme2 .product-item-data-detail>div.right {
    -webkit-box-flex: 3;
    /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 3;
    /* OLD - Firefox 19- */
    -webkit-flex: 3;
    /* Chrome */
    -ms-flex: 3;
    /* IE 10 */
    flex: 3;
    /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

#itme2 .product-list .product-item-data-detail>div.left,
#itme2 .product-list .product-item-data-detail>div.right {
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

.product-list-item-detail.product-item-data-detail {
    padding-left: .7rem;
    padding-right: .7rem;
    position: relative;
}

#item1 .product-list-item-detail.product-item-data-detail {}

.product-list-item-detail.product-item-data-detail h3 {
    font-size: .9rem;
}

.product-list-item-detail.product-item-data-detail h3 img {
    width: .7rem;
    display: inline-block;
    margin-left: .2rem
}

.product-list-item-detail.product-item-data-detail .right {
    padding-left: .8rem;
}

.product-list-item-detail.product-item-data-detail .middle {
    text-align: right;
    padding-right: 0;
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
    position: relative;
    padding-bottom: .2rem
}

.product-list-item-detail.product-item-data-detail .middle>a {
    color: #27a0ff;
    font-size: .7rem
}

.product-list-item-detail.product-item-data-detail::after {
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

.product-list-item-detail-info {
    overflow: hidden;
}

.product-list-item-detail-info p {
    margin: .1rem 0 .1rem .7rem;
    padding-right: .7rem;
    font-size: .6rem;
    float: right;
    border-right: 1px solid rgba(200, 200, 200, .3)
}

.product-list-item-detail-info p:first-child {
    border-right: none
}

#itme2 .product-item-button {
    padding-top: .5rem;
    padding-bottom: 1.2rem
}

.product-item-button button {
    width: 85%
}

.circle_bg,
.circle_none {
    width: 60px;
    height: 60px;
    display: inline-block;
    position: relative;
    text-align: right;
}

.circle_none {
    width: 65px;
    height: 65px;
}

.circle_none img {
    width: 100%
}

.circle_text {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 22px;
    font-size: 16px;
    line-height: 1;
    font-weight: 600
}

.padding-5 {
    padding-top: .5rem;
    padding-bottom: .5rem;
}

.m-content {
    -webkit-overflow-scrolling: touch;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
}

.item-over .product-list-item-detail.product-item-data-detail h3,
.item-over .product-list-item-header.product-item-header .product-item-title {
    color: #999
}

.loan-header .product-item-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    box-sizing: border-box;
}
</style>