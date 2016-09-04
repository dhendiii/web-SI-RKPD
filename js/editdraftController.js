app.controller('editdraftController', ['$scope', '$rootScope', '$state', '$stateParams', 'fetcher', 'autocomplete', 'localStorageService', 'Upload', '$timeout', function($scope, $rootScope, $state, $stateParams, fetcher, autocomplete, localStorageService, Upload, $timeout){

    'use strict';

    $rootScope.$state       = $state;
    $rootScope.$stateParams = $stateParams;

    $scope.draft_id         = $stateParams.draft_id;  //*** Exists! ***//
    $scope.draft            = [];
    $scope.getAuth          = localStorageService.get('result');

    console.log($scope.draft_id);

    $scope.listskpd         = [];
    $scope.listunit         = autocomplete.getUnit();

    $scope.selected         = {};

    $scope.dataLokasi       = autocomplete.getKelurahan();

    var fetchskpd         = function(){
        fetcher.getSKPD(function(response) {
            if (response.response == 'OK' && response.status_code == 200) {
                $scope.listskpd = response.result;
            }
        });
    };


    $scope.errorloginmessage    = '';
    $scope.kegiatan             = '';
    $scope.lokasi_cakupan       = "";
    $scope.lokasi_detail        = "";
    $scope.lokasi_kelurahan     = "";
    $scope.lokasi_kecamatan     = "";
    $scope.tags                 = "";
    $scope.skpd                 = "";
    $scope.verifikasi           = "";
    $scope.verifikasi_ket       = "";

    $scope.ikp_konten           = "";
    $scope.ikp_jumlah           = "";
    $scope.ikp_unit             = "";
    $scope.ikp_verifikasi       = "";
    $scope.ikp_verket           = "";

    $scope.anggaran             = "";
    $scope.sumberanggaran       = "";
    $scope.jeniskegiatan        = "";
    $scope.keterangan           = "";
    $scope.foto                 = "";
    $scope.proposal             = "";



    var getDraft        = function(id){

        fetcher.getDraft(id, function(response){
            if (response.response == 'OK' && response.status_code == 200) {
                console.log(response);
                $scope.draft            = response.result;
            }
        });
    };
    getDraft($scope.draft_id);

    $scope.getSKPDModel         = "";

    var getSKPDModel         = function(){
        if ($scope.getAuth.skpd != null) {
            $scope.skpd =  $scope.getAuth.skpd;
        }
    };
    $scope.tab = { "tags" : "", "skpd" : "",}


    $scope.showlocation     = function(cakupan, detail, kelurahan, kecamatan){
        switch (cakupan) {
            case 'kota': return 'Kota Cimahi'; break;
            case 'kecamatan': return kecamatan; break;
            case 'kelurahan': return kelurahan + ', ' + kecamatan; break;
            case 'dusun': return detail + ', ' + kelurahan + ', ' + kecamatan; break;
            default : return 'not valid';
        }
    };


    $scope.draft_result = [];
    $scope.updateDraft      = function(){
        var data = {
            "kegiatan"          : $scope.kegiatan,
            "lokasi_cakupan"    : $scope.lokasi_cakupan,
            "lokasi_detail"     : $scope.lokasi_detail,
            "lokasi_kelurahan"  : $scope.lokasi_kelurahan,
            "lokasi_kecamatan"  : $scope.lokasi_kecamatan,
            "tags"              : ($scope.tags == null) ? JSON.stringify($scope.tags) : '',
            "skpd"              : $scope.skpd,
            "verifikasi"        : $scope.verifikasi,
            "verifikasi_ket"    : $scope.verifikasi_ket,

            "ikp_konten"        : $scope.ikp_konten,
            "ikp_jumlah"        : $scope.ikp_jumlah,
            "ikp_unit"          : $scope.ikp_unit,
            "ikp_verifikasi"    : $scope.ikp_verifikasi,
            "ikp_verket"        : $scope.ikp_verket,

            "anggaran"          : $scope.anggaran,
            "sumberanggaran"    : $scope.sumberanggaran,
            "jeniskegiatan"     : $scope.jeniskegiatan,
            "keterangan"        : $scope.keterangan,
            "foto"              : $scope.foto,
            "proposal"          : $scope.proposal,
        };

        var id = $scope.draft_id;
        console.log(data);


        fetcher.putDraft(id, data, function(response){
            if (response.response == 'OK' && response.status_code == 200 && !_.isNull(response.result)) {
                // o.countVote = o.lik
                // console.log(response.result.like);
            }
        });
        $state.go('home');


    };

    fetchskpd();
    // getSKPDModel();

}]);
