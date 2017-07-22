/**
 * Created by Administrator on 17-7-18.
 */
var dataParam = PCNEW.util.getToken();

dataParam.data = {
    "id" : 192,
    "page" : 0,
    "size" : 11
};

var dataJsonObj = angular.toJson(dataParam, true);

var myApp=angular.module('myApp',[]);

myApp.controller('personCtrl',function($scope,$http){
    $http.post(PCNEW.cfg.URL_API + 'moreRecmdList',dataJsonObj).
        then(function (result) {  //姝ｇ‘璇锋眰鎴愬姛鏃跺鐞�
            console.log(result.data);
            $scope.recmdList = result.data.data.recmdList;
            
        }).catch(function (result) {
        });
    /**
     * 鎵撳紑鏈湴鏂囦欢澶�
     */
    $scope.local = function() {
        if(window.external.openLocalVideoWin) {
            window.external.openLocalVideoWin();
        }
    };

    /**
     * 鎼滅储
     */
    $scope.search = function() {
        alert(22)
    };

    /**
     * 鎾斁瑙嗛鎸夐挳
     * is3d, videoVo_vid,mediaVo_id,mediaVo_vfidurl,videoVo_vname,mediaVo_duration,isvip
     */
    $scope.playvideo2 = function(param) {
        console.log("鐐瑰嚮瑙嗛鎾斁鎸夐挳")
        if(param) {
            console.log(param);
            return;
        }
        var is2d = is3d==16 ? 2 : -1; //鎾斁鍣ㄥ弬鏁�is2d : 0/-1琛ㄧず3D瑙嗛锛涙帴鍙ｅ弬鏁癷s3d锛�6琛ㄧず2D瑙嗛

        var user = {};
        if(window.external.getUserInfo) {
            user = window.external.getUserInfo();
        }
        if (user.isVip == 1) { //浼氬憳
            isvip = 1; //浼氬憳鍙湅鎵�湁鐗囷紝杩欓噷鐩存帴鏀硅鐪嬫偍鏉冮檺
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
             * 鏌ヨ瑙嗛鐨勬挱鏀捐褰�
             */
            dataParam.data = {
                "vid" : videoVo_vid
            };
            var dataJsonObj = angular.toJson(dataParam, true);
            $http.post(PCNEW.cfg.URL_API + 'getPlayRecord',dataJsonObj).
            then(function (result) {  //姝ｇ‘璇锋眰鎴愬姛鏃跺鐞�
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
     * 鎾斁鎺ュ彛
     */
    $scope.play = function() {
        alert(222222222222)
    }
});