/**
 * Created by Administrator on 17-7-24.
 */

var curPicPage = 0;
var curSpecPage = 0;
var dataParam1 = PCNEW.util.getToken();
dataParam1.data = {
    "page" : curPicPage,
    "size" : 28,
    "channelId" : 33
};
var dataJsonObj1 = angular.toJson(dataParam1, true);


var dataParam2 = PCNEW.util.getToken();
dataParam2.data = {
    "page" : curSpecPage,
    "size" : 30,
    "moduleId" : 2
};
var dataJsonObj2 = angular.toJson(dataParam2, true);


var myApp=angular.module('myApp',[]);

myApp.controller('personCtrl',function($scope,$http,$timeout){
    $scope.isPicture = true;
    $scope.isPicEnd = false;
    $scope.isSpecEnd = false;
    $scope.t = 100;

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //进行瀑布流
        console.log(1111111111111);

        $timeout(function () {
            waterfall('ul','li');

            getUlHeight();

        }, 600);
    });

    $scope.$on('ngRepeatFinished22', function (ngRepeatFinishedEvent) {
//        picScroll();
        console.log(2222222222222222);
    });

    /**
     * 图片列表接口
     */
    $http.post(PCNEW.cfg.URL_API + 'getPictureList',dataJsonObj1).
        then(function (result) {
            console.log(result.data);
            $scope.pictureList = result.data.data.pictureList;

            var len = result.data.data.pictureList.length;
            if(len < 28) {
                $scope.isPicEnd = true;
            }

            curPicPage++;

        }).catch(function (result) {
        });
    /**
     * 专题列表接口
     */
    $http.post(PCNEW.cfg.URL_API + 'getSpecialList',dataJsonObj2).
        then(function (result) {
            console.log(result.data);
            $scope.specialList = result.data.data.specialList;

            var len = result.data.data.specialList.length;
            if(len < 30) {
                $scope.isSpecEnd = true;
            }

            curSpecPage++;

        }).catch(function (result) {
        });

    /**
     * 标签切换
     */
    $scope.tab = function(param) {
        if(param == 'picture') {
            $scope.isPicture = true;
        } else {
            $scope.isPicture = false;
//            picScroll();
        }
    };

    /**
     * 图片列表更多
     */
    $scope.getPicMore = function() {
        var dataParam1 = PCNEW.util.getToken();
        dataParam1.data = {
            "page" : curPicPage,
            "size" : 28,
            "channelId" : 33
        };
        var dataJsonObj1 = angular.toJson(dataParam1, true);

        $http.post(PCNEW.cfg.URL_API + 'getPictureList',dataJsonObj1).
            then(function (result) {
                console.log(result.data);
                $scope.pictureList = $scope.pictureList.concat(result.data.data.pictureList);

                var len = result.data.data.pictureList.length;
                var totalLen = $scope.pictureList.length;
                var totalCount = result.data.data.totalCount;


                if(len < 28 || (len==28 && totalLen == totalCount)) {
                    $scope.isPicEnd = true;
                }

                curPicPage++;

            }).catch(function (result) {
            });
    };

    /**
     * 专题列表更多
     */
    $scope.getSpecMore = function() {
        var dataParam2 = PCNEW.util.getToken();
        dataParam2.data = {
            "page" : curSpecPage,
            "size" : 30,
            "moduleId" : 2
        };
        var dataJsonObj2 = angular.toJson(dataParam2, true);

        $http.post(PCNEW.cfg.URL_API + 'getSpecialList',dataJsonObj2).
            then(function (result) {
                console.log(result.data);
                $scope.specialList = $scope.specialList.concat(result.data.data.specialList);

                var len = result.data.data.specialList.length;
                var totalLen = $scope.specialList.length;
                var totalCount = result.data.data.totalCount;


                if(len < 30 || (len==30 && totalLen == totalCount)) {
                    $scope.isSpecEnd = true;
                }

                curSpecPage++;

            }).catch(function (result) {
            });
    }
});

myApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');//向控制器发射渲染完成的消息。
                });
            }
        }
    };
});

myApp.directive('onFinishRenderFilters22', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished22');//向控制器发射渲染完成的消息。
                });
            }
        }
    };
});

myApp.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

myApp.filter('filterImgUrl', function() {
    return function(text) {
        return PCNEW.util.getImgUrl(text);
    }
});
