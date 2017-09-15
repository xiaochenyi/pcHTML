/**
 * Created by Administrator on 17-8-16.
 */
angular.module('PageModule',[])
    .config(['$ocLazyLoadProvider','$stateProvider','$futureStateProvider',function($ocLazyLoadProvider,$stateProvider,$futureStateProvider){
        $futureStateProvider.futureState({
            "type" : "ocLazyLoad",
            "stateName" : "page.page1",
            "url" : "/page1",
            load: [{
                name: "Page1Module",
                reconfig: true,
                files: ["apps/page/page1/Page1Module.js"]
            }]
        });

        $futureStateProvider.futureState({
            "type" : "ocLazyLoad",
            "stateName" : "page.page2",
            "url" : "/page2",
            load: [{
                name: "Page2Module",
                reconfig: true,
                files: ["apps/page/page2/Page2Module.js"]
            }]
        });

        $stateProvider.state('page',{
            url : '/page',
            template : '<div>I am the page.</div><div ui-view></div>'
        });
    }]);