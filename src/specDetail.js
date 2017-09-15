/**
 * Created by Administrator on 17-8-22.
 */
var specialId = PCNEW.util.getQueryString("specialId");

var myApp = angular.module('myApp',[]);
var token = PCNEW.util.getToken();

myApp.controller('ZTdetailCtrl', function ($scope, $http) {
    /**
     * 图片列表接口
     */
    $scope.getPicData = function() {
        var data = {
            data:{
                "page" : 0,
                "size" : 1000,
                "specialId" : specialId
            }
        };
        var b = {};
        var dataJsonObj = angular.extend(b, token, data);
        $http.post(PCNEW.cfg.URL_API + 'getSpecial',dataJsonObj).
            then(function (result) {
                console.log(result.data);
                $scope.refSpecialList = result.data.data.refSpecialList;
                $scope.description = result.data.data.description;
                $scope.name = result.data.data.name;

            }).catch(function (result) {
            });

    };
});