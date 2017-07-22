/**
 * pc2.0��������
 */
var PCNEW = PCNEW || {};
PCNEW.util = {
	urlGame : function(url) {
        return PCNEW.cfg.URL_API + url;
    },

    /**
     * 获取token
     */
    getToken : function() {
    	var dataParam = { "seqId":1, "protover":"1.0", "termId":"53102", "userId":"0", "sessionId": 7130336396747932000,
                "termNo":"76A0F38520987D4BECA0C892176523C1",
                "termClass":1, "termType":1, "cliver":"0.0.1", "data":""
        };
    	
    	return dataParam;
    },

    /**
     * 获取URL参数
     */
    getQueryString : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },

    /**影片时长格式化 时分秒格式
     * @param value
     * @returns {String}
     */
    formatSecondsToTime : function(value) {
        var that = this;
        if($.trim(value)==''){
            return "00:00:00";
        }
        var theTime = parseInt(value);
        var theTime1 = 0;
        var theTime2 = 0;
        if(theTime > 60) {
            theTime1 = parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
                theTime2 = parseInt(theTime1/60);
                theTime1 = parseInt(theTime1%60);
            }
        }

        var result = ""+that.fomateMsTime(parseInt(theTime));
        if(theTime1 > 0) {
            result = ""+that.fomateMsTime(parseInt(theTime1))+":"+result;
        }else{
            result = "00"+":"+result;
        }
        if(theTime2 > 0) {
            result = ""+that.fomateMsTime(parseInt(theTime2))+":"+result;
        }else {
            result = "00"+":"+result;
        }
        return result;
    },
    fomateMsTime : function(str) {
        if(str<10) {
            return "0"+str;
        }else {
            return str;
        }
    },
    /**
     * 豆瓣分值计算格式0.0
     */
    scoreNum : function(num){
        if (isNaN(num)){
            num = "0.0";
            return num;
        }
        num=parseInt(num);
        if(num==0){
            num = "0.0";
            return num;
        }
        if(num>0){
            num=parseFloat((num/100)).toFixed(1);
        }
        return num;
    }
};


