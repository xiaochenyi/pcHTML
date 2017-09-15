angular.module('Main',['ui.router', 'ct.ui.router.extras'])
    .config(['$stateProvider', '$futureStateProvider', '$ocLazyLoadProvider',function($stateProvider, $futureStateProvider, $ocLazyLoadProvider){
        $futureStateProvider.addResolve(function($http){//从远程加载
            return $http({
                url : 'states.json',
                method : "GET",
                headers : {
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            }).then(function (resp) {
                    if (resp && resp.data && resp.data) {
                        angular.forEach(resp.data, function (appItem) {
                            var fstate = {
                                type: appItem.type,
                                stateName: appItem.stateName,
                                url: appItem.url,
                                load: [{
                                    name: appItem.moduleName,
                                    reconfig: true,
                                    files: [appItem.src]
                                }]
                            };
                            $futureStateProvider.futureState(fstate);
                        });
                    }
                });
        });

        $futureStateProvider.stateFactory('ocLazyLoad', function($q, $ocLazyLoad, futureState) {
            var deferred = $q.defer();

            $ocLazyLoad.load(futureState.load).then(function() {
                deferred.resolve();
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        });

        $futureStateProvider.futureState({
            "type" : "ocLazyLoad",
            "stateName" : "login",
            "url" : "login",
            load : {
                name: "LoginModule",
                reconfig: true,
                files: ["LoginModule.js"]
            }
        });
    }])
    .run(['$state','$timeout',function($state,$timeout){
        $state.go('login');
    }]);