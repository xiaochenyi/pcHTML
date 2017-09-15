/**
 * 网络请求
 */
var PCNEW = (PCNEW || {});
PCNEW.Network = {
    urlGame : function(url) {
        return PCNEW.cfg.URL_API + url;
    },
    req : function(url, onSuccess, onError, data, timeout) {
        var obj = {
            type : "post",
            contentType : "application/json",
            async : true,
            url : url,
            dataType : "json",
            success : function(res) {
                console.log(res);
                onSuccess(res);
            },
            error : function(res) {
                console.log("请求失败！");
                onError(res);
            },
            timeout : timeout || 20000
        };
        if(false) {
            obj.beforeSend = function(R) {
                try {
                    R.setRequestHeader('Connection', 'Keep-Alive');
                } catch(e) {
                }
            }
        }
        if(data != null) {
            obj.data = data;
        }
        return $.ajax(obj);
    }
};
