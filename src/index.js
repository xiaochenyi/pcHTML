/**
 * Created by Administrator on 17-7-18.
 */

var myApp=angular.module('myApp',[]);

myApp.controller('personCtrl',function($scope,$http,$window){
    /**
     * resize
     */
    $scope.onResize = function() {
        angular.element(".cont").css({
            "width": "100%",
            "height": "100%",
            "top": 0,
            "left": "-100%"
        });
    };
    angular.element($window).bind('resize', $scope.onResize);

    /**
     * 初始化shover效果
     */
    var a=new sHover("li","b");
    a.set({
        slideSpeed:1,
        opacityChange:true,
        opacity:85
    });

    /**
     * 初始化接口moreRecmdList
     */
    var dataParam = PCNEW.util.getToken();
    dataParam.data = {
        "id" : 192,
        "page" : 0,
        "size" : 11
    };
    var dataJsonObj = angular.toJson(dataParam, true);
    $http.post(PCNEW.cfg.URL_API + 'moreRecmdList',dataJsonObj).
        then(function (result) {
            console.log(result.data);
            $scope.recmdList = result.data.data.recmdList;
            
        }).catch(function (result) {
        });
    /**
     * 打开本地文件夹
     */
    $scope.local = function() {
        if(window.outward && window.outward.showMessage) {
            window.outward.showMessage("打开文件夹");
        }

        // 测试一下弹出窗口
        if(window.outward && window.outward.showWin) {
            window.outward.showWin('标题222','https://www.baidu.com/',700,700);
        }
    };

    /**
     * 视频播放接口
     * is3d, videoVo_vid,mediaVo_id,mediaVo_vfidurl,videoVo_vname,mediaVo_duration,isvip
     */
//    $scope.playvideo2 = function(is3d, videoVo_vid,mediaVo_id,mediaVo_vfidurl,videoVo_vname,mediaVo_duration,isvip) {
    $scope.playvideo2 = function(param) {
        console.log(param);
        var is3d = param.is3d,
            videoVo_vid = param.rid,
            mediaVo_id = param.medialist[0].id,
            mediaVo_vfidurl = param.medialist[0].vfid,
            videoVo_vname = param.name,
            mediaVo_duration = param.medialist[0].duration,
            isvip = param.isvip;


        var is2d = is3d==16 ? 2 : -1; //播放器参数 is2d : 0/-1表示3D视频；接口参数is3d：16表示2D视频

        var user = {};
        if(window.external.getUserInfo) {
            user = window.external.getUserInfo();
        }
        if (user.isVip == 1) { //会员
            isvip = 1; //会员可看所有片，这里直接改观看您权限
        }

        if(mediaVo_id != '') {
            var dataParam = PCNEW.util.getToken();
            dataParam.data = {
                "vid" : videoVo_vid
            };
            var dataJsonObj = angular.toJson(dataParam, true);
            $http.post(PCNEW.cfg.URL_API + 'getPlayRecord',dataJsonObj).
            then(function (result) {
                console.log("getPlayRecord接口");
                console.log(result.data);
                var playDuration = result.data.data.playDuration;
                // 进入视频播放器
                if(window.external.playVideo) {
                    window.external.playVideo(mediaVo_vfidurl, videoVo_vname, playDuration, videoVo_vid, mediaVo_id, is2d, 2);
                }
                $scope.play(videoVo_vid, mediaVo_id, 0);
            }).catch(function (result) {
            });
        }
    };
    /**
     * play接口
     */
    $scope.play = function(vid,mediaId,playDuration) {
        var dataParam = PCNEW.util.getToken();
        dataParam.data = {
            "vid" : vid,
            "mediaId" : mediaId,
            "playDuration" : playDuration
        };
        var dataJsonObj = angular.toJson(dataParam, true);
        $http.post(PCNEW.cfg.URL_API + 'play',dataJsonObj).
            then(function (result) {
                console.log("play接口");
                console.log(result.data);
            }).catch(function (result) {
            });
    };
    /**
     * 下载视频
     */
});