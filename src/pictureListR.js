/**
 * Created by Administrator on 17-8-14.
 */

var myApp = angular.module('myApp',['ngRoute', 'ngScrollbars', 'masonry']);
var token = PCNEW.util.getToken();

myApp.controller('InitController', function ($scope, $http, $timeout) {
    /**
     * 图片列表接口
     */
    $scope.getPicData = function() {
        var data = {
            data:{
                "page" : 0,
                "size" : 28,
                "channelId" : 33
            }
        };
        var b = {};
        var dataJsonObj = angular.extend(b, token, data);
        $http.post(PCNEW.cfg.URL_API + 'getPictureList',dataJsonObj).
            then(function (result) {
            console.log(result.data);
                $scope.pictureList = result.data.data.pictureList;

//            var len = result.data.data.pictureList.length;
//            if(len < 28) {
//                $scope.isPicEnd = true;
//            }
//
//            curPicPage++;

            }).catch(function (result) {
            });

    };
    /**
     * 专题列表接口
     */
    $scope.getSpecData = function() {
        var data = {
            data:{
                "page" : 0,
                "size" : 30,
                "moduleId" : 2
            }
        };
        var b = {};
        var dataJsonObj = angular.extend(b, token, data);
        $http.post(PCNEW.cfg.URL_API + 'getSpecialList',dataJsonObj).
            then(function (result) {
                console.log(result.data);
                $scope.specialList = result.data.data.specialList;

//                var len = result.data.data.specialList.length;
//                if(len < 30) {
//                    $scope.isSpecEnd = true;
//                }
//
//                curSpecPage++;

            }).catch(function (result) {
            });
    };




});

myApp.controller('JXController', function ($scope, $route, $http, $timeout) {
    $scope.$route = $route;

    /**
     * 图片列表更多
     */
    $scope.getPicMore = function() {
        var data = {
            data:{
                "page" : 1,
                "size" : 28,
                "channelId" : 33
            }
        };
        var b = {};
        var dataJsonObj = angular.extend(b, token, data);
        $http.post(PCNEW.cfg.URL_API + 'getPictureList',dataJsonObj).
            then(function (result) {
                console.log(result.data);
                $scope.pictureList = $scope.pictureList.concat(result.data.data.pictureList);

            }).catch(function (result) {
            });
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {

    });

});

myApp.controller('ZTController', function ($scope, $route) {
    $scope.$route = $route;


});

myApp.config(function ($routeProvider,ScrollBarsProvider) {
        $routeProvider.
            when('/jingxuan', {
                templateUrl: 'templates/1.html',
                controller: 'JXController'
            }).
            when('/zhuanti', {
                templateUrl: 'templates/2.html',
                controller: 'ZTController'
            }).
            otherwise({
                redirectTo: '/jingxuan'
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