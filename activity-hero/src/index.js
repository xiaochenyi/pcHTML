/**
 * Created by Administrator on 17-8-28.
 */

var PCNEW = (PCNEW || {});
PCNEW.IndexLayer = {
    totalData: [],
    shopCartList: [],
    init: function() {
        this.totalData = [];
        // 初始化数据
        this.getData();
        // 事件
        this.bindEvents();
    },
    /**
     * 获取这十条专题数据
     */
    getData: function() {
        var that = this;
        var tokenParam = { "seqId":1, "protover":"1.0", "termId":"53102", "userId":"0", "sessionId": 7130336396747932000,
            "termNo":"76A0F38520987D4BECA0C892176523C1",
            "termClass":4, "termType":4000, "cliver":"0.0.1", "data":""
        };

        if(window.Andriod && window.Andriod.getParameter) {
//            alert(window.Andriod.getParameter());
            tokenParam = JSON.parse(window.Andriod.getParameter());
        }

        tokenParam.data = {
//            "id": 138,
            "id": 328,
            "page":0,
            "size":20
        };
        var totalData = JSON.stringify(tokenParam);

//        var url = "http://172.16.100.217:8080/app/getPictureHomeSpecialList";
        var url = "http://app.api.3dov.cn/app/getPictureHomeSpecialList";
        var success = function(res) {
            console.log(res);
            that.totalData = res.data.SpecialList;
            $(".loading").hide();
        };
        var error = function(res) {
            console.log(res);
        };
        var data = totalData;
        PCNEW.Network.req(url, success, error, data);
    },
    /**
     * 绑定事件
     */
    bindEvents: function() {
        var that = this;

        // 点击图片预览
        $(".pic").click(function() {
            var i = $(".pic").index(this);
//            alert(JSON.stringify(that.totalData));
//            console.log(i);
//            console.log(that.totalData[i]);
//            // 点击进入播放器
//            if(window.Andriod && window.Andriod.openPicPlayer) {
//                alert("qqqqqqqqqq");
//                window.Andriod.openPicPlayer(JSON.stringify(that.totalData), i, 1, 138);
//            }
            var previewUrl = that.totalData[i].previewUrl;
            $(".preview .img").attr("src", previewUrl);
            $(".preview").show();
        });
        // 点击添加购物车
        $(".btn-add").click(function() {
            var i = $(".btn-add").index(this);
            if(that.totalData.length <= 0) {
                alert("网络异常，请求数据错误");
            }
//            console.log(i);
//            console.log(that.totalData[i]);

//            // 支持打印多张的代码开始
//            if($(this).attr("src") == "images/btn-add-off.png") {
//                $(this).attr("src", "images/btn-add-on.png"); // 表示已在购物车
//                that.totalData[i].productQuantity = 1; // 默认数量是一个
//                that.totalData[i].productPrice = 49; // 默认价钱是49
//                that.shopCartList.push(that.totalData[i]);
//            } else {
//                $(this).attr("src", "images/btn-add-off.png"); // 表示没在购物车
//                var idx = that.shopCartList.indexOf(that.totalData[i]);
//                that.shopCartList.splice(idx,1);
//            }
//            // 支持打印多张的代码结束


            // 只支持单张打印
            $(".btn-add").attr("src", "images/btn-add-off.png");
            $(this).attr("src", "images/btn-add-on.png"); // 表示已在购物车
            that.totalData[i].productQuantity = 1; // 默认数量是一个
            that.totalData[i].productPrice = 49; // 默认价钱是49
            that.shopCartList = [];
            that.shopCartList.push(that.totalData[i]);


            DFSJ5.storage.setJSON("SHOPPING-CART-LIST", that.shopCartList); // 存进缓存

            // 改变结算总数
            var arr = DFSJ5.storage.getJSON("SHOPPING-CART-LIST");  //取缓存
            console.log(arr);
            var len = arr.length;
            if(len == 0) {
                $(".btn-settlement").attr("src", "images/btn-settlement-off.png").data("status", false);
                $(".result").html("请将您感兴趣的图片购添加到购物车");
            } else {
                $(".btn-settlement").attr("src", "images/btn-settlement-on.png").data("status", true);
                var money = len * 49;
                $(".result").html("已选" + len + "张图片，合计" + money + ".00");
            }

            return false;
        });
        // 点击分享按钮
        $(".btn-share").click(function() {
            console.log("分享按钮");
        });
        // 点击去结算
        $(".btn-settlement").click(function() {
            var status = $(this).data("status");
            if(status) {
                if(window.Andriod && window.Andriod.islogin) {
                    var userId = window.Andriod.islogin();

//                    alert(userId);
                    if(!userId) {
                        return;
                    }
                    window.location.href = "order.html";
                }

            }
        })
    }
};