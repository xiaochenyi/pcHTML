/**
 * Created by Administrator on 17-8-16.
 */
angular.module('Page1Module',[])
    .config(['$ocLazyLoadProvider','$stateProvider',function($ocLazyLoadProvider,$stateProvider){
        $stateProvider.state('page.page1',{
            url : '/page1',
            controller : 'Page1Ctrl',
            templateUrl : 'apps/page/page1/view/page1.html',
            resolve : {
                controller : ['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name : 'Page1CtrlModule',
                        files : ['apps/page/page1/controller/Page1CtrlModule.js']
                    });
                }]
            }
        });
    }]);