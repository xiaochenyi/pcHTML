// Code goes here

var app = angular.module("plunk", ['ct.ui.router.extras']);

app.run(function($state, $rootScope) {
    $rootScope.$state = $state;
})

app.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('tabs', {
        url: '/',
        templateUrl: 'tab-viewport.html',
    });

    $stateProvider.state('tabs.account', {
        url: '/account',
        sticky: true,
        dsr: true,
        views: {
            'account': {
                templateUrl: 'account.html'
            }
        }
    });

    $stateProvider.state('tabs.account.stuff', {
        url: '/stuff',
        template: "<h3>Here's my stuff:</h3><ul><li>stuff 1</li><li>stuff 2</li><li>stuff 3</li></ul>"
    });

    $stateProvider.state('tabs.account.things', {
        url: '/things',
        template: "<h3>Here are my things:</h3><ul><li>thing a</li><li>thing b</li><li>thing c</li></ul>"
    });



    $stateProvider.state('tabs.survey', {
        url: '/survey',
        sticky: true,
        views: {
            'survey': {
                templateUrl: 'survey.html'
            }
        }
    });


    $stickyStateProvider.enableDebug(true);
});