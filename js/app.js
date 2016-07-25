var angular = angular;

var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    'use strict';

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
    //
    // $urlRouterProvider.otherwise( function($injector) {
    //     var $state = $injector.get("$state");
    //     $state.go('auth.login');
    // });

    $stateProvider
    // .state('header', {
    //     url:'/header',
    //     templateUrl : '/views/header.html',
    //     controller : 'headerController',
    // })

    .state('beranda', {
        url : '/',
        templateUrl : 'views/beranda.html',
        controller : 'berandaController',
    })

    .state('informasi', {
        url : '/draft',
        templateUrl : 'views/draftdetail.html',
        controller : 'informasiController',
    })
    // .state('coba2', {
    //     url : '/coba2',
    //     templateUrl : 'views/coba2.html',
    //     controller : 'coba2Controller',
    // });
});

app.controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope){
    'use strict';

    $scope.header   = 'views/header.html';
}]);
