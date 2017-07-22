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
myApp.controller('personCtrl',function($scope,$http){
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

            setTimeout(function(){
                www();
            },0);
        }).catch(function (result) {
        });

    /**
     * 打开本地文件夹
     */

    /**
     * 播放视频按钮
     * is3d, videoVo_vid,mediaVo_id,mediaVo_vfidurl,videoVo_vname,mediaVo_duration,isvip
     */
    $scope.playvideo2 = function(param) {
        console.log("点击视频播放按钮")
        if(param) {
            console.log(param);
            return;
        }
        var is2d = is3d==16 ? 2 : -1; //播放器参数 is2d : 0/-1表示3D视频；接口参数is3d：16表示2D视频

        var user = {};
        if(window.external.getUserInfo) {
            user = window.external.getUserInfo();
        }
        if (user.isVip == 1) { //会员
            isvip = 1; //会员可看所有片，这里直接改观看您权限
        }

        var mediaVo = {
            id: mediaVo_id,
            vfidurl: mediaVo_vfidurl,
            duration: mediaVo_duration
        };
        var videoVo = {
            vid: videoVo_vid,
            vname: videoVo_vname
        };

        if(mediaVo_id != '') {
            /**
             * 查询视频的播放记录
             */
            dataParam.data = {
                "vid" : videoVo_vid
            };
            var dataJsonObj = angular.toJson(dataParam, true);
            $http.post(PCNEW.cfg.URL_API + 'getPlayRecord',dataJsonObj).
            then(function (result) {  //正确请求成功时处理
                console.log(result.data);
                var playDuration = result.data.data.playDuration;
                if(window.external.playVideo) {
                    window.external.playVideo(mediaVo.vfidurl,videoVo.vname,playDuration,videoVo.vid,mediaVo.id,is2d,2);
                }
                $scope.play();
            }).catch(function (result) {
            });

        }


    }
    /**
     * 播放接口
     */
    $scope.play = function() {
        alert(222222222222)
    }
});

myApp.filter('formatSecondsToTime', function() { //可以注入依赖
    return function(text) {
        return PCNEW.util.formatSecondsToTime(text);
    }
});

myApp.filter('scoreNum', function() { //可以注入依赖
    return function(text) {
        return PCNEW.util.scoreNum(text);
    }
});

