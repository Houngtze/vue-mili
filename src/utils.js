
import layer from 'vue-layer-mobile'

var utils = {
    //金额格式化千分位(000,000,000)
    AmountFormate: function(str){
        var _this = str
        var number = _this.toString();
        var num = _this + "";
        num = num.replace(new RegExp(",", "g"), "");
        //判断是否为0
        if (/^0{1}.*0*$/.test(num)) {
            return num;
        }
        // 正负号处理
        var symble = "";
        if (/^([-+]).*$/.test(num)) {
            symble = num.replace(/^([-+]).*$/, "$1");
            num = num.replace(/^([-+])(.*)$/, "$2");
        }
        if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
            var num = num.replace(new RegExp("^[0]+", "g"), "");
            if (/^\./.test(num)) {
                num = "0" + num;
            }
            var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
            var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");
            var re = /(\d+)(\d{3})/;
            while (re.test(integer)) {
                integer = integer.replace(re, "$1,$2");
            }
            var result = symble + integer + decimal;
            return result;

        } else {
            return number;
        }
    },
    getNowFormatDate: function() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + "." + month + "." + strDate;

        return currentdate;
    },
// toast: 文字和图标:
    toast: function(content){        
        layer.toast({
          icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
          content: content || '',
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
        })
        return false
    },
    // loading:
    loading: function(content){
        layer.loading(content);
        setTimeout(function(){
            layer.close();
        },3000);
    },
    // dialog:
    dialog: function(title,content,btn,callback){
        layer.dialog({
          title: title || ['标题', 'background:red;display:none'], // 第一个是标题内容  第二个是标题栏的style(可以为空) 
          content: content || '',
          contentClass: 'className',
          btn: btn || ['确定','取消'],
        //   time: 2000
        })
        // 如果有btn 
        .then(function (res){
          // res为0时是用户点击了左边  为1时用户点击了右边 
            let position = res
            console.log(position)
            if (position==0) {
                callback()
            }
         })
    },
    // footer:
    layerFooter: function(content){
        layer.footer({
          content:  content || '',
          btn: ['取消', '确定']
        })
        // 如果有btn 
        .then(function (res){
          var text = res==0 ? '取消' : '选项'+res
          console.log(text)
        })
    },
    //open
    layerOpen: function(content){
        layer.open({
            style: 'border:none; background-color:#78BA32; color:#fff;',
            content: content || '',
        })
    },
    //close
    layerClose: function(){
        var _this = layer;
        setTimeout(function(){
            _this.$layer.close();
        },3000);
    },
    checkPhone: function(str){
        var mobile = "^((13[0-9])|(14[0-9])|(15[^4,\\D])|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\\d{8}$";
        return new RegExp(mobile).test(str);
    },
    checkPassword: function(str){
        var password = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$";
        return new RegExp(password).test(str);
    }
}
export default utils