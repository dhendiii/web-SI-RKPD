var angular = angular;

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngTagsInput', 'ngMessages', 'ngTouch', 'ngTagsInput', 'ngPassword', 'LocalStorageModule', 'ct.ui.router.extras.core', 'permission', 'permission.ui', 'ngFileUpload']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    'use strict';

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('home');
    });

    $stateProvider
    .state('home', {
        // abstract: true,
        url: '',
        templateUrl : 'views/beranda.html',
        controller : 'berandaController'
    })

    // .state('home.drafts', {
    //     templateUrl : 'views/drafts.html',
    //     controller : 'draftsController'
    // })
    //
    // .state('draft', {
    //     url : '/draft',
    //     templateUrl : 'views/draft.html',
    //     controller : 'informasiController',
    // })

    .state('draft', {
        url : '/draft/:draft_id',
        templateUrl : 'views/draft.html',
        controller : 'draftController',
        params : {
            draft_id : 'draft_id',
        }
    })
    .state('draftedit', {
        url : '/draft/:draft_id/edit',
        templateUrl : 'views/editdraft.html',
        controller : 'editdraftController',
        params : {
            draft_id : 'draft_id',
        },
    })

    .state('inputdraft', {
        url : '/inputdraft',
        templateUrl : 'views/inputdraft.html',
        controller : 'inputdraftController',
        data: {
            permissions: {
                only: ['isAuthorized'],
                redirectTo: 'home'
            }
        }
    })

    .state('authlanding', {
        abstract : true,
        url : '/auth',
        templateUrl : 'views/authlanding.html',
        controller : 'authController',
        data : {
            permissions: {
                except: ['isAuthorized'],
                redirectTo: 'home'
            }
        }
    })

    .state('authlanding.login', {
        url : '',
        templateUrl : 'views/login.html',
        controller : 'loginController'
    })

    .state('authlanding.register', {
        url : '',
        templateUrl : 'views/register.html',
        controller : 'registerController'
    })

    .state('authlanding.registerskpd', {
        url : '/registerskpd',
        templateUrl : 'views/registerskpd.html',
        controller : 'registerController'
    })


    .state('test', {
        url : '/test',
        templateUrl : 'views/uploadfile.html',
        controller : 'uploadfile',
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
            return !_.isNull(localStorageService.get('result'));
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

app.controller('MainController', ['$scope', '$rootScope', '$state', 'localStorageService', 'autocomplete', 'fetcher', function($scope, $rootScope, $state, localStorageService, autocomplete, fetcher){
    'use strict';

    $scope.header           = 'views/header.html';
    $scope.dataLokasi           = autocomplete.getKelurahan();

    $scope.listskpd           = [];
    var fetchskpd         = function(){
        fetcher.getSKPD(function(response) {
            if (response.response == 'OK' && response.status_code == 200) {
                $scope.listskpd = response.result;
            }
        });
        console.log($scope.listskpd);
    };

    fetchskpd();

    $scope.showLogin      = _.isNull(localStorageService.get('result'));
    // $scope.getAuthId        = localStorageService.get('_id');

    $scope.getAuth        = localStorageService.get('result');
    // console.log({{getAuthID}});

    $scope.logout           = function() {
        $scope.showLogin    = true;
        localStorageService.remove('_id');
        localStorageService.remove('result');
        $state.go('home');
        console.log('logout berhasil');
    };

    $scope.login        = function() {
        // $scope.showLogin    = false;
        $state.go('authlanding.login');
    };
    console.log($scope.getAuth);
    console.log($scope.showLogin);
    console.log(localStorageService.get('_id'));
}]);
