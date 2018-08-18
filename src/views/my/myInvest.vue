<template>
<div id="site-content" class="m-content">
  		<loading :loadingShow="l_show"></loading>
  		<topBar :title="'我的投资'" :backShow="true"></topBar>
        <div style="background-color:#fff;position:fixed;width: 100%;z-index:1000;top:2.5rem" id="tab">
            <div class="m-tab">
                <a :class="activeClass[0]" @click="tabShow('sxb')"><span>随心宝</span></a>
                <a :class="activeClass[1]" @click="tabShow('zcb')"><span>整存宝</span></a>
            </div>
        </div>
        <div id="itme1" class="itme m-tab-content" style="padding-top:4.5rem;" v-if="activeTab=='sxb'">
            <div class="tab-conent">
                <div class="invest-list" id="sxb_list">
                    <ul>
                        <li v-for="(item,index) in sxb_list" :key="item.id" @click="goDetail(item.id,'loan')">
                            <div class="invest-list-item-header product-item-header">
                                <span>■</span>
                                <span class=" product-item-title">{{item.name}}</span>
                            </div>
                              <div class="invest-list-item-detail product-item-data-detail padding-5">
                                <div class="left">
                                    <h3>{{item.amount}}</h3>
                                    <p>已投金额(元)</p>
                                </div>
                                <div class="right">
                                    <h3>{{item.yearrate}}%</h3>
                                    <p>预期年化收益率</p>
                                </div>
                                <div class="middle">
                                    <a v-text="statusInfo(item.status)"></a>
                                </div>
                            </div>
                            <div class="m-flex-box invest-list-item-info">
                                <p class="left flex-1">回款日期：<span>{{item.end_date}}</span></p>
                                <p class="right flex-1">{{item.type}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="txtList_sxb" class="list-holder" @click="getData" v-if="pageEnd_z">点击加载更多</div>
        </div>
        <div id="itme2" class="itme m-tab-content" style="padding-top:4.5rem;" v-if="activeTab=='zcb'">
            <div class="tab-conent">
                <div class="invest-list" id="zcb_list">
                    <ul>
                        <li v-for="(item,index) in zcb_list" :key="item.id" @click="goDetail(item.id,'plan')">
                            <div class="invest-list-item-header product-item-header">
                                <span>■</span>
                                <span class=" product-item-title">{{item.name}}</span>
                            </div>
                            <div class="invest-list-item-detail product-item-data-detail padding-5">
                                <div class="left">
                                    <h3>{{item.amount}}</h3>
                                    <p>已投金额(元)</p>
                                </div>
                                <div class="right">
                                    <h3 class="color-ff6459">{{item.yearrate}}%</h3>
                                    <p>预期年化收益率</p>
                                </div>
                                <div class="middle">
                                    <a>{{item.statusinfo}}</a>
                                </div>
                            </div>
                            <div class="m-flex-box invest-list-item-info">
                                <p class="left flex-1">回款日期：<span>{{item.end_date}}</span></p>
                                <p class="right flex-1">{{item.type}}</p>
                            </div>
                            <div class="invest-button">
                                <div class="product-item-button">
                                <button disabled>续投</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="txtList_sxb" class="list-holder" @click="getData" v-if="pageEnd_z">点击加载更多</div>
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
    	l_show: false,
    	sxb_list: [],
    	zcb_list: [],
    	activeTab: '',
    	activeClass: ['m-active',''],
    	page_s: 1,
    	page_z: 1,
    	pageEnd_s: true,
    	pageEnd_z: true
    }
  },
  components: {
	  loading,
	  topBar
  },
  created() {

  },
  methods: {
    getData() {
        this.l_show = true;
        axios.post(config.url_investList,{
        	page: this.activeTab == 'sxb' ? this.page_s++ : this.page_z++,
            type: this.activeTab
        }).then(response=>{
	        console.log(this.currentPage)
            let ret = response.data;
            console.log(ret)
            this.l_show = false;
            if (ret.errcode == 0) {
            	let list = ret.data.All_items
                if (this.activeTab == 'sxb') {
                	list.map(n => this.sxb_list.push(n))
                	if (this.currentPage==ret.data.allPage) {
                		this.pageEnd_s=false
                	}
                }else{
                	list.map(n => this.zcb_list.push(n))
                	if (this.currentPage==ret.data.allPage) {
                		this.pageEnd_z=false
                	}
                }
            }
        })
      },
      tabShow(type) {
      	if (type != this.activeTab) {
      		if (this.activeTab == 'sxb') {
      			this.activeClass =  ['','m-active']
      			this.activeTab = 'zcb'
      		}else{
				this.activeClass = ['m-active','']
      			this.activeTab = 'sxb'
      		}
      	}
      },
  	 statusInfo: function(status) {
  		return status == 1 ? "收益中" : "已回款"
	 },
	 goDetail: function (id, type) {
    	this.$router.push({name:'myInvestDetail',query:{ id: id, type: type}});
    }
  },
  computed: {
  	currentPage: function() {
  		return this.activeTab == 'sxb' ? this.page_s: this.page_z
  	}
  },
  // 路由守卫，通过url上的参数获取id和类型
  beforeRouteEnter  (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
        vm.l_show = true;
        vm.activeTab = to.query.type == "sxb" || !to.query.type ?  'sxb' : 'zcb';
        vm.activeClass = to.query.type == "sxb" || !to.query.type ?  ['m-active',''] : ['','m-active'];

        axios.post(config.url_investList,{
        	page: 1,
            type: "loan"
        }).then(response=>{
            let ret = response.data;
            vm.l_show = false;
            if (ret.errcode == 0) {
                console.log(ret)
                if (ret.data.allPage == 1) {
            		vm.pageEnd_s=false
            	}
                vm.sxb_list = ret.data.All_items

            }
        })

        axios.post(config.url_investList,{
        	page: 1,
            type: "plan"
        }).then(response=>{
            let ret = response.data;
            vm.l_show = false;
            if (ret.errcode == 0) {
                console.log(ret)
                if (ret.data.allPage == 1) {
            		vm.pageEnd_z=false
            	}
                vm.zcb_list = ret.data.All_items
            }
        })
        
      })
  }
}
</script>

<style scoped> 
html,
body {
    background: #f5f5f5;
    padding-bottom: 40px
}
.m-content{
	margin-bottom: 3rem
}

.m-tab a {
    width: 50%;
}
.m-tab a.m-active {
    border-bottom: 3px solid #0F88E6;
}
.list-holder {
    text-align: center;
    padding: 1rem 0;
    font-size: .6rem
}

.list-holder img {
    width: .8rem;
    vertical-align: middle;
    margin-right: .5rem;
}

.invest-list {
    padding-top: .5rem;
    text-align: center;
}

.m-content {
    -webkit-overflow-scrolling: touch;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
}

.invest-list li {
    background: #fff;
    margin-bottom: .3rem
}

.invest-list-item-header.product-item-header {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    padding: .5rem .7rem 0 .7rem;
    width: 100%
}

.invest-list-item-header.product-item-header .product-item-title {
    font-size: .7rem
}

.invest-list-item-header.product-item-header label {
    display: inline-block;
    border: 1px solid #ff6459;
    padding: 0 .2rem;
    border-radius: .3rem;
    color: #EE6E60;
    font-size: .6rem;
}

.invest-list-item-header.product-item-header::after {
    display: none
}

.invest-list-item-detail.product-item-data-detail {
    padding-left: .7rem;
    padding-right: .7rem;
    position: relative;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
}

.invest-list-item-detail.product-item-data-detail>div {
    margin: .3rem 0
}

.invest-list-item-detail.product-item-data-detail .left {
    border-right: 1px solid rgba(100, 100, 100, .3)
}

.invest-list-item-detail.product-item-data-detail h3 {
    font-size: .8rem;
    color: #ff6459
}

.invest-list-item-detail.product-item-data-detail h3 img {
    width: .7rem;
    display: inline-block;
    margin-left: .2rem
}

.invest-list-item-detail.product-item-data-detail .right {
    padding-left: .8rem;
}

.invest-list-item-detail.product-item-data-detail .middle {
    text-align: right;
    padding-right: .5rem;
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

.invest-list-item-detail.product-item-data-detail .middle>a {
    color: #27a0ff;
    font-size: .7rem
}

.invest-list-item-info {
    padding: .3rem .7rem
}

.invest-list-item-info p {
    margin-bottom: 0;
    font-size: .6rem
}

.product-item-button .disable {
    background-image: none;
    background-color: #bfbfbf
}
</style>