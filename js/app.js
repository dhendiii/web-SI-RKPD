var angular = angular;

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngTagsInput', 'ngMessages', 'ngTouch', 'ngPassword', 'LocalStorageModule', 'ct.ui.router.extras.core', 'permission', 'permission.ui']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    'use strict';

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('home');
    });

    $stateProvider
    // .state('header', {
    //     url:'/header',
    //     templateUrl : '/views/header.html',
    //     controller : 'headerController',
    // })

    // .state('home', {
    //     url: '',
    //     // templateUrl: 'views/beranda.html',
    //     // controller: 'berandaController',
    //     views: {
    //         '' : {
    //             templateUrl : 'views/beranda.html',
    //             // controller : 'berandaController'
    //         },
    //         'sidebar' : {
    //             templateUrl : 'views/sidebar.html',
    //             // controller  : 'sidebarController'
    //         },
    //         'drafts' : {
    //             templateUrl : 'views/drafts.html',
    //             // controller  : 'draftsController'
    //         }
    //     }
    // })

    .state('home', {
        // abstract: true,
        url: '',
        templateUrl : 'views/beranda.html',
        controller : 'berandaController'
    })

    .state('home.drafts', {
        templateUrl : 'views/drafts.html',
        controller : 'draftsController'
    })

    .state('home.sidebar', {
        templateUrl : 'views/sidebar.html',
        controller : 'sidebarController'
    })

    // .state('sidebar', {
    //     // url : '/',
    //     templateUrl : 'views/sidebar.html',
    //     controller : 'sidebarController',
    // })

    .state('informasi', {
        url : '/informasi',
        templateUrl : 'views/informasi.html',
        controller : 'informasiController',
    })

    .state('inputdraft', {
        url : '/inputdraft',
        templateUrl : 'views/inputdraft.html',
        controller : 'inputdraftController',
        // data: {
        //     permissions: {
        //         only: ['isAuthorized'],
        //         redirectTo: 'beranda'
        //     }
        // }
    })

    .state('authlanding', {
        abstract : true,
        url : '/auth',
        templateUrl : 'views/authlanding.html',
        controller : 'authController',
        data : {
            permissions: {
                only: ['isAuthorized'],
                redirectTo: 'beranda'
            }
        }
    })

    .state('authlanding.login', {
        url : '',
        templateUrl : 'views/login.html',
        controller : 'loginController'
    })

    .state('authlanding.register', {
        url : '/register',
        templateUrl : 'views/register.html',
        controller : 'registerController'
    })

    .state('authlanding.registerskpd', {
        url : '/registerskpd',
        templateUrl : 'views/registerskpd.html',
        controller : 'registerController'
    })





    // .state('coba2', {
    //     url : '/coba2',
    //     templateUrl : 'views/coba2.html',
    //     controller : 'coba2Controller',
    // });
});

app.run(function (PermissionStore, localStorageService) {
    PermissionStore
        .definePermission('isAuthorized', function () {
            return _.isNull(localStorageService.get('result'));
        });
});

app.directive('capitalizeFirst', function($parse) {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if (inputValue === undefined) { inputValue = ''; }
           var capitalized = inputValue.charAt(0).toUpperCase() +
                             inputValue.substring(1);
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
     }
   };
});

app.controller('MainController', ['$scope', '$rootScope', '$state', 'localStorageService', function($scope, $rootScope, $state, localStorageService){
    'use strict';

    $scope.header           = 'views/header.html';

    $scope.showLogin      = _.isNull(localStorageService.get('result'));
    // $scope.getAuthId        = localStorageService.get('_id');


    $scope.getAuth        = localStorageService.get('result');
    // console.log({{getAuthID}});

    // if ()

    $scope.logout           = function() {
        $scope.showLogin    = true;
        localStorageService.remove('_id');
        localStorageService.remove('result');
        $state.go('beranda');
        console.log('logout berhasil');
    };

    $scope.login        = function() {
        // $scope.showLogin    = false;
        $state.go('authlanding.login');
    };
    console.log($scope.getAuth);
    console.log($scope.showLogin);
}]);
