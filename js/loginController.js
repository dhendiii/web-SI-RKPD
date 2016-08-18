app.controller('loginController', ['$scope', '$state', 'fetcher', 'localStorageService', function($scope, $state, fetcher, localStorageService){

    $scope.email                = "";
    $scope.password             = "";

    $scope.errorloginmessage    = '';

    $scope.submitLogin  = function(){
        var data = {
            "email"     : $scope.email,
            "password"  : $scope.password,
        };

        fetcher.postLogin(data, function(response){
            if (response.response == 'OK' && response.status_code == 200) {
                localStorageService.set('_id', response.result._id);
                localStorageService.set('result', response.result);
                // localStorageService.set('nama_depan', response.result.nama_depan);
                // localStorageService.set('nama_belakang', response.result.nama_belakang);
                // localStorageService.set('role', response.result.role);
                $state.go('beranda');
                $scope.$parent.$parent.showLogin    = false;

                console.log(response.result);
                console.log(response.result._id);
                console.log(response.result.nama_belakang);
                console.log(response.result.nama_depan);
                console.log(response.result.role);
            } else {
                $scope.errorloginmessage    = response.message.substr(0, response.message.indexOf('on line'));
            }
        });
    };
}]);
