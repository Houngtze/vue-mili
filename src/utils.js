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
    }
}
export default utils