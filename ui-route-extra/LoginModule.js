/**
 * Created by Administrator on 17-8-16.
 */
angular.module('LoginModule',[])
    .config(['$ocLazyLoadProvider','$stateProvider',function($ocLazyLoadProvider,$stateProvider){
        $stateProvider.state('login',{
            url : 'login',
            controller : 'LoginCtrl',
            templateUrl : 'login.html',
            resolve : {
                controller : ['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name : 'LoginCtrlModule',
                        files : ['LoginCtrlModule.js']
                    });
                }]
            }
        });
    }]);