webpackJsonp([9],{eSC2:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("oSxK"),e=a("KgXo"),n=a("I4Fq"),d=a("n5Qe"),v=(a("L/hj"),{data:function(){return{data:"",l_show:!1,type:""}},created:function(){},components:{loading:e.a,topBar:i.a},methods:{statusInfo:function(t){return 1==t?"收益中":"已回款"},interest_type:function(t){return"last_pay"==t?"到期还本付息":"分期付息"}},computed:{investType:function(){return"loan"==this.type?"随心宝":"整存宝"}},beforeRouteEnter:function(t,s,a){a(function(s){s.l_show=!0,s.type=t.query.type,n.a.post(d.a.url_hasInevestDetail,{id:t.query.id,action:t.query.type}).then(function(t){var a=t.data;s.l_show=!1,console.log(a),0==a.errcode&&(s.data=a.data)})})}}),r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"m-content ",attrs:{id:"site-content"}},[a("loading",{attrs:{loadingShow:t.l_show}}),t._v(" "),a("topBar",{attrs:{title:"我的投资",backShow:!0}}),t._v(" "),a("div",{staticClass:"m-item-title",staticStyle:{"margin-top":"2.5rem"}},[a("div",{staticClass:"left"},[t._v("\n              项目名称\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"invest_name"}},[t._v(t._s(t.data.name))])]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              回款方式\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"interest_type"},domProps:{textContent:t._s(t.interest_type(t.data.interest_type))}})]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              投资类型\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"type"}},[t._v(t._s(t.investType))])]),t._v(" "),a("div",{staticClass:"m-item-title margin-bottom"},[a("div",{staticClass:"left"},[t._v("\n              项目状态\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"status"},domProps:{textContent:t._s(t.statusInfo(t.data.status))}})]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              本金：\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"amount"}},[t._v(t._s(t.data.amount))])]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              预期年化收益率：\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"yearrate"}},[t._v(t._s(t.data.yearrate))])]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              项目收益：\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"interest"}},[t._v(t._s(t.data.interest))])]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              投资日期：\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"start_date"}},[t._v(t._s(t.data.start_date))])]),t._v(" "),a("div",{staticClass:"m-item-title"},[a("div",{staticClass:"left"},[t._v("\n              回款日期：\n          ")]),t._v(" "),a("div",{staticClass:"right",attrs:{id:"end_date"}},[t._v(t._s(t.data.end_date))])])],1)},staticRenderFns:[]};var l=a("VU/8")(v,r,!1,function(t){a("tg0m")},null,null);s.default=l.exports},tg0m:function(t,s){}});
//# sourceMappingURL=9.b734985b82cfade1c41c.js.map