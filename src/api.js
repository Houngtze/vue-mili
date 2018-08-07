 //http://mili.9ihere.com/api/ http://192.168.18.22/api/
// var url_head ="http://192.168.18.22/api/"
const url_head ="http://mili.9ihere.com/api/";
export const config = {
    //narkang
    url_user : url_head + "user", // 获取用户信息
    url_question_list : url_head + "questionList",
    url_userPassThrough : url_head + "userPassThrough", // 提交答题闯关
    url_hasPass : url_head + "hasPass", //答题闯关到达第几关
    url_my_invite : url_head + "myInvite",
    url_activity_detail : url_head + "activityDetail",
    url_activity_list : url_head + "activityList",
    url_recharge : url_head + "recharge",
    url_change_headImg : url_head + "changeHeadImg",
    url_change_phone : url_head + "changePhone",
    url_user_account : url_head + "userAcount",
    url_change_user_bank : url_head + "changeUserBank",
    url_user_bank : url_head + "userBank",
    url_change_user_bank : url_head + "changeUserBank",
    url_withdrawals : url_head + "withdrawals",
    url_myCoupon : url_head + "myCoupon",
    url_systemcRule : url_head + "systemcRule",
    url_intStoreTreasure : url_head + "intStoreTreasure",  //整存宝列表
    url_casualStoreTreasure : url_head + "casualStoreTreasure",  //随心宝列表
    url_intStoreDetail : url_head + "intStoreDetail", // 整存宝详情
    url_casualStoreDetail : url_head + "casualStoreDetail", // 随心宝详情
    url_investList : url_head + "investList",   //投资记录
    url_productInvestList : url_head + "productInvestList",   //单个产品投资记录
    url_myInvestCoupon : url_head + "myInvestCoupon",   // 投资产品优惠券
    url_investCasualStore : url_head + "investCasualStore",   // 随心宝投资
    url_investStoreTreasure : url_head + "investStoreTreasure",   // 整存宝投资
    url_validatorBackPassword : url_head + "validatorBackPassword", //找回密码验证码验证
    url_changePassword : url_head + "changePassword",
    url_recchargeList : url_head + "recchargeList",
    url_withdrawalsList : url_head + "withdrawalsList",
    url_signIn : url_head + "signIn", // 签到
    url_yesterdaySign :  url_head + 'yesterdaySign',
    url_login : url_head + 'login', //登陆
    url_getSmsCode : url_head + 'getSmsCode', //获取短信验证码
    url_feedBack : url_head + 'feedBack', //意见反馈
    url_userRisk : url_head + 'userRisk',    // 风险评测答案提交
    url_isRisk : url_head +'isRisk',
    url_findBackAccount : url_head + 'findBackAccount', //找回账户
    url_no_uploadimg : url_head + 'no_uploadimg', //上传图片不需要token
    url_uploadimg : url_head + 'uploadimg', //上传图片
    url_register : url_head + 'register', //注册
    url_changeNickName : url_head + 'changeNickName', //修改昵称
    url_getSmsCode : url_head + 'getSmsCode', //获取短信验证码
    url_validatorSms : url_head + 'validatorSms', //校验短信验证码
    url_piggyBanklogList : url_head + 'piggyBanklogList', //零钱宝明细
    url_deleteYebLog : url_head + 'deleteYebLog',
    url_investList : url_head + 'investList', // 我的投资记录
    url_hasInevestDetail : url_head + 'hasInevestDetail', // 我的投资记录详情
    url_identityUser : url_head + 'identityUser',
    url_getCoupon : url_head + "getCoupon", //领取优惠券包
    url_paymentCalendar : url_head + "paymentCalendar", // 回款日历
    url_userDayInvestBack : url_head + "userDayInvestBack",  //某一天的回款项目
    url_shareInteger : url_head + "shareInteger",
    url_pushActivityList : url_head + "pushActivityList", //推送活动列表
    url_validatorBackPhoneSms : url_head +"validatorBackPhoneSms", // 用户原手机验证更换手机号
    //xiey
    url_luckDraw : url_head + "luckDraw",
    url_allLuckDraw : url_head + "allLuckDraw",
    url_noticeList : url_head + "noticeList",
    url_noticeListDetail : url_head + "noticeListDetail",
    url_accountLogList : url_head + 'accountLogList',
    url_messageList : url_head + 'messageList',
    url_deleteMessage : url_head + 'deleteMessage',
    url_banner : url_head + 'banner',
    url_yebBanner: url_head + 'yebBanner',
    url_homeProduct : url_head + 'homeProduct', //首页产品

    //lc
    url_signList : url_head + "signList",
    url_allItem : url_head + "allItem",
    url_userIntegral : url_head + "userIntegral",
    url_itemDetail : url_head + "itemDetail",
    url_submitOrder : url_head + "submitOrder",
    url_getUserAddress : url_head + "getUserAddress",
    url_addUserAddress : url_head + "addUserAddress",
    url_updateUserAddress : url_head + "updateUserAddress",
    url_userIntegralList : url_head + "userIntegralList",
    url_allOrder : url_head + "allOrder",
    url_orderUserDetail : url_head +"orderUserDetail",
    url_deleteOrder : url_head + "deleteOrder",
    url_sevenDayRate : url_head + "sevenDayRate",
    url_rechargePiggyBank : url_head + "rechargePiggyBank",
    url_withdrawalsPiggyBank : url_head + "withdrawalsPiggyBank",
    url_luckDrawList : url_head + "luckDrawList",
    url_piggyBankInformation : url_head + "piggyBankInformation",
    url_luckDrawOrder : url_head + "luckDrawOrder",
    url_sevenDayRateList : url_head + "sevenDayRateList",  //七日年化利率列表
}