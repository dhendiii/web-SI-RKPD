app.controller('registerController', ['$scope', '$state', 'fetcher', 'autocomplete', 'localStorageService', function($scope, $state, fetcher, autocomplete, localStorageService){
    'use strict';

    $scope.buttonplaceholder    = '#A9A9AD';

    $scope.listKecamatan    = _.keys(autocomplete.getKecamatan());
    $scope.listKelurahan    = [];

    $scope.tags             = [];
    $scope.tagslist         = _.map(autocomplete.getTag(), function(val){ return {'text' : val}; });

    $scope.listskpd             = autocomplete.getSKPD();
    $scope.listunit             = autocomplete.getUnit();

    $scope.state    = '',

    $scope.kecamatanChanged = function(data) {
        $scope.lokasi_kecamatan = data;

        $scope.lokasi_kelurahan = '';
        $scope.listKelurahan    = autocomplete.getKecamatan()[data];
    };

    $scope.kelurahanChanged = function(data) {
        $scope.lokasi_kelurahan = data;
    };
    //
    //
    // function cekTipeUser(){
    //
    //     if ($scope.skpd != null) {
    //         return "pemerintah"
    //     } else {
    //         return "masyarakat"
    //     }
    // };

    //cobain dynamic select
    $scope.selected             = {};
    $scope.dataLokasi           = autocomplete.getKelurahan();

    $scope.nama_depan           = "";
    $scope.nama_belakang        = "";
    $scope.no_ktp               = "";
    $scope.lokasi_detail        = "";
    $scope.lokasi_kelurahan     = "";
    $scope.lokasi_kecamatan     = "";
    $scope.email                = "";
    $scope.no_hp                = "";
    $scope.password             = "";
    // $scope.password.confrim = "";
    $scope.user_tipe            = "";
    $scope.user_poin            = 0;
    $scope.skpd                 = "";
    $scope.skpd_role            = "";

    $scope.errorloginmessage    = '';

    $scope.submitUser      = function(){
        var data = {
            "nama_depan"          : $scope.nama_depan,
            "nama_belakang"       : $scope.nama_belakang,
            "email"               : $scope.email,
            "no_hp"               : $scope.no_hp,
            "password"            : $scope.password,
            "lokasi_detail"       : $scope.lokasi_detail,
            "lokasi_kelurahan"    : $scope.lokasi_kelurahan.kel,
            "lokasi_kecamatan"    : $scope.lokasi_kecamatan.kec,
            "user_tipe"           : ($scope.skpd == "") ? 'masyarakat' : 'pemerintah',
            "no_ktp"              : $scope.no_ktp,
            "user_poin"           : $scope.user_poin,
            "skpd"                : $scope.skpd,
            "skpd_role"           : $scope.skpd_role,

        };

        console.log(data);

        fetcher.postUser(data, function(response){
            console.log(response);
            if (response.response == 'OK' && response.status_code == 200) {
                localStorageService.set('_id', response.result.id);
                localStorageService.set('result', response.result);
                // localStorageService.set('nama_depan', response.result.nama_depan);
                // localStorageService.set('nama_belakang', response.result.nama_belakang);
                // localStorageService.set('role', response.result.role);
                $state.go('beranda');
                // $scope.$parent.$parent.showLogin    = false;
                // console.log('berhasil');
                console.log('respone.result');

            } else {
                $scope.errorloginmessage    = response.message.substr(0, response.message.indexOf('on line'));
                // console.log('gagal');
            }
        });
    };


}]);
