/**
 * Created by Administrator on 17-8-14.
 */

var myApp = angular.module('myApp',['ui.router', 'masonry', 'ngScrollbars']);
var token = PCNEW.util.getToken();

myApp.controller('InitController', function ($scope, $http, $timeout,$window) {
    $scope.curPicPage = 0;
    $scope.curSpecPage = 0;
    /**
     * 图片列表接口
     */
    $scope.getPicData = function(p) {
        var page = p || 0;
        var data = {
            data:{
                "page" : page,
                "size" : 28,
                "channelId" : 33
            }
        };
        var b = {};
        var dataJsonObj = angular.extend(b, token, data);
        $http.post(PCNEW.cfg.URL_API + 'getPictureList',dataJsonObj).
            then(function (result) {
                console.log(result.data);
                if(page == 0) {
                    $scope.pictureList = result.data.data.pictureList;
                } else {
                    $scope.pictureList = $scope.pictureList.concat(result.data.data.pictureList);
                }

            var len = result.data.data.pictureList.length;
            if(len < 28) {
                $scope.isPicEnd = true;
            }

            $scope.curPicPage++;

            }).catch(function (result) {
            });

    };
    /**
     * 专题列表接口
     */
    $scope.getSpecData = function(p) {
        var page = p || 0;
        var data = {
            data:{
                "page" : page,
                "size" : 30,
                "moduleId" : 2
            }
        };
        var b = {};
        var dataJsonObj = angular.extend(b, token, data);
        $http.post(PCNEW.cfg.URL_API + 'getSpecialList',dataJsonObj).
            then(function (result) {
                console.log(result.data);
                if(page == 0) {
                    $scope.specialList = result.data.data.specialList;
                } else {
                    $scope.specialList = $scope.specialList.concat(result.data.data.specialList);
                }

                var len = result.data.data.specialList.length;
                if(len < 30) {
                    $scope.isSpecEnd = true;
                }

                $scope.curSpecPage++;

            }).catch(function (result) {
            });
    };
    $scope.getPicMore = function () {
        $scope.getPicData($scope.curPicPage);
    };
    $scope.getSpecMore = function () {
        $scope.getSpecData($scope.curSpecPage);
    };
    /**
     * 点击进入播放器
     */
    $scope.goPlay = function(itemObj) {
//        console.log(itemObj);
//        console.log($scope.pictureList);
        var index = $scope.pictureList.indexOf(itemObj);
        console.log(index);
        /*imageJsonArray：图片信息;
         0：专题，1：精品列表;
         大于0表示专题ID，0表示非专题即精选图片，-1表示首页图片
         index:索引，图片在imageJsonArray的位置
         */
        if(window.external.showPicture) {
            window.external.showPicture(JSON.stringify($scope.pictureList), 1, 0, index);
        }
    }

});

myApp.controller('JXController', function ($scope) {});

myApp.controller('ZTController', function ($scope) {});

myApp.config(function ($urlRouterProvider,$stateProvider,ScrollBarsProvider) {
//    $routeProvider.
//        when('/jingxuan', {
//            templateUrl: 'templates/1.html',
//            controller: 'JXController'
//        }).
//        when('/zhuanti', {
//            templateUrl: 'templates/2.html',
//            controller: 'ZTController'
//        }).
//        otherwise({
//            redirectTo: '/jingxuan'
//        });


    $urlRouterProvider.when("", "/jingxuan");

    $stateProvider.state("jingxuan", {
        url : "/jingxuan",
        templateUrl : "templates/1.html"
    }).state("zhuanti", {
            url : "/zhuanti",
            templateUrl : "templates/2.html"
        });

    // the following settings are defined for all scrollbars unless the
    // scrollbar has local scope configuration
    ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: true // enable scrolling buttons by default
        },
        //scrollInertia: 400, // adjust however you want
        axis: 'y', // enable 2 axis scrollbars by default,
        theme: '3d-thick',
        autoHideScrollbar: false
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