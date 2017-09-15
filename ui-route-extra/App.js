/**
 * Created by Administrator on 17-8-16.
 */
var myApp = angular.module("myApp", [ 'ui.router' ]);

myApp.config(function($stateProvider, $urlRouterProvider) {

//    $urlRouterProvider.when("", "/PageTab");
//
//    $stateProvider.state("PageTab", {
//        url : "/PageTab",
//        templateUrl : "PageTab.html"
//    }).state("PageTab.Page1", {
//            url : "/Page1",
//            templateUrl : "Page1.html"
//        }).state("PageTab.Page2", {
//            url : "/Page2",
//            templateUrl : "Page2.html"
//        }).state("PageTab.Page3", {
//            url : "/Page3",
//            templateUrl : "Page3.html"
//        });

    $urlRouterProvider.when("", "/page1");

    $stateProvider.state("page1", {
        url : "/page1",
        templateUrl : "page1.html"
    }).state("page2", {
            url : "/page2",
            templateUrl : "Page2.html"
        }).state("page3", {
            url : "/page3",
            templateUrl : "Page3.html"
        });
});



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


            }).catch(function (result) {
            });
    };




});