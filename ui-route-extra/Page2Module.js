/**
 * Created by Administrator on 17-8-16.
 */
angular.module('Page2Module',[])
    .config(['$ocLazyLoadProvider','$stateProvider',function($ocLazyLoadProvider,$stateProvider){
        $stateProvider.state('page.page2',{
            url : '/page2',
            controller : 'Page2Ctrl',
            templateUrl : 'apps/page/page2/view/page2.html',
            resolve : {
                controller : ['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name : 'Page2CtrlModule',
                        files : ['apps/page/page2/controller/Page2CtrlModule.js']
                    });
                }]
            }
        });
    }]);