/**
 * Created by Administrator on 17-7-18.
 */
var vid = PCNEW.util.getQueryString("vid");

// getVideoNew请求参数
var dataParam1 = PCNEW.util.getToken();
dataParam1.data = {
    "vid" : vid
};
var dataJsonObj1 = angular.toJson(dataParam1, true);

// getVideoRelatedList请求参数
var dataParam2 = PCNEW.util.getToken();
dataParam2.data = {
    "vid" : vid,
    "page" : 0,
    "size" : 6
};
var dataJsonObj2 = angular.toJson(dataParam2, true);


var myApp=angular.module('myApp',[]);
myApp.controller('personCtrl',function($scope,$http,$window,$timeout){
    $scope._click = false;
    /**
     * resize
     */
    $scope.onResize = function() {
        $wrapUl = $(".part2 .wrap-ul");
        ulWrapWidth = $wrapUl.width();
        $li = $(".part2 ul li");
        li_w = $wrapUl.width()/4;
        $li.width(li_w); // 每一个li的宽度
        li_len = $li.length;
        $ul = $(".part2 ul");
        // 初始化位置
        $ul.css("left",0);
        $ul.width(li_w * li_len); // 总宽度
    };
    angular.element($window).bind('resize', $scope.onResize);
    /**
     * 视频详情信息接口
     */
    $http.post(PCNEW.cfg.URL_API + 'getVideoNew',dataJsonObj1).
        then(function (result) {  //正确请求成功时处理
            console.log(result.data);
            $scope.videoDetail = result.data.data;
        }).catch(function (result) {
        });
    /**
     * 推荐视频列表接口
     */
    $http.post(PCNEW.cfg.URL_API + 'getVideoRelatedList',dataJsonObj2).
        then(function (result) {  //正确请求成功时处理
            console.log(result.data);
            $scope.videoRelatedList = result.data.data.videoRelatedList;

            var len = $scope.videoRelatedList.length;
            if(len <= 4) {
                $(".arrow").css("visibility","hidden");
            }

            $timeout(function () {
                $scope.onResize();
            }, 10);

        }).catch(function (result) {
        });
    /**
     * left箭头
     */
    $scope.goLeft = function() {
        if(!$scope._click) {
            $scope._click = true;
            var _mLeft = $ul.css("left");
            if(li_len <= 4 || parseInt(_mLeft) >= 0) {
                $scope._click = false;
                return;
            }
            var _d = parseInt(_mLeft) + li_w;
            $ul.stop(true, true).animate({
                "left" : _d + "px"
            }, 300, "linear",function() {
                $scope._click = false;
            });
        }
    };
    /**
     * right箭头
     */
    $scope.goRight = function() {
        if(!$scope._click) {
            $scope._click = true;
            var ulWidth = $ul.width();
            var _mLeft = $ul.css("left");
            if(li_len <= 4 || (parseInt(_mLeft) != 0 && parseInt(_mLeft) <= (ulWrapWidth + 10 - ulWidth))) {
                $scope._click = false;
                return;
            }

            var _d = parseInt(_mLeft) - li_w;
            $ul.stop(true, true).animate({
                "left" : _d + "px"
            }, 300, "linear", function() {
                $scope._click = false;
            });
        }
    };
    /**
     * 点击播放
     */
    $scope.playVideo = function(param) {
        console.log("点击播放");
        console.log(param);
    };
    /**
     * 点击进入视频详情
     */
    $scope.goDetail = function(param,$event) {
        console.log("点击进入视频详情");
        console.log(param);
        $event.stopPropagation();
    };
});

myApp.filter('formatSecondsToTime', function() {
    return function(text) {
        return PCNEW.util.formatSecondsToTime(text);
    }
});

myApp.filter('scoreNum', function() {
    return function(text) {
        return PCNEW.util.scoreNum(text);
    }
});

