app.controller('inputdraftController', ['$scope', '$rootScope', '$state', '$stateParams', 'fetcher', 'autocomplete', 'localStorageService', 'Upload', '$timeout', function($scope, $rootScope, $state, $stateParams, fetcher, autocomplete, localStorageService, Upload, $timeout){

    'use strict';

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // input draft
    $scope.step = 0;

    // $scope.listskpd             = autocomplete.getSKPD();
    $scope.listskpd           = [];
    $scope.listunit             = autocomplete.getUnit();

    //cobain dynamic select
    $scope.selected             = {};

    $scope.dataLokasi           = autocomplete.getKelurahan();

    $scope.next     = function() { $scope.step++; console.log($scope.step);};
    $scope.prev     = function() { $scope.step--; console.log($scope.step);};
    $scope.revert   = function() { $scope.step = 0;};

    var fetchskpd         = function(){
        fetcher.getSKPD(function(response) {
            if (response.response == 'OK' && response.status_code == 200) {
                $scope.listskpd = response.result;
            }
        });
    };



    // $scope.kecamatanChanged = function(data) {
    //     $scope.lokasi_kecamatan = data;
    //
    //     $scope.lokasi_kelurahan = '';
    //     $scope.listKelurahan    = autocomplete.getKecamatan()[data];
    // };
    //
    // $scope.kelurahanChanged = function(data) {
    //     $scope.lokasi_kelurahan = data;
    // };

    $scope.getAuth        = localStorageService.get('result');


    $scope.errorloginmessage    = '';
    $scope.kegiatan             = "";
    $scope.lokasi_cakupan       = 'kota';
    $scope.lokasi_detail        = "";
    $scope.lokasi_kelurahan     = "";
    $scope.lokasi_kecamatan     = "";
    $scope.tags                 = "";
    $scope.skpd                 = "";
    $scope.draft_id             = "";


    $scope.tab = { "tags" : "", "skpd" : "",}

    // $scope.isiSKPD              = '';

    $scope.getSKPDModel         = "";
    var getSKPDModel         = function(){
        if ($scope.getAuth.skpd != null) {
            $scope.skpd =  $scope.getAuth.skpd;
        }
    };

    $scope.draft_result = [];
    $scope.submitDraft      = function(){
        var data = {
            "kegiatan"          : $scope.kegiatan,
            "draft_tipe"        : ($scope.getAuth.user_tipe == 'masyarakat') ? 'Usulan' : 'Rancangan',
            "lokasi_cakupan"    : $scope.lokasi_cakupan,
            "lokasi_detail"     : $scope.lokasi_detail,
            "lokasi_kelurahan"  : $scope.lokasi_kelurahan.kel,
            "lokasi_kecamatan"  : $scope.lokasi_kecamatan.kec,
            "skpd"              : ($scope.tab.skpd.nama != null) ? $scope.tab.skpd.nama : $scope.skpd,
            "tags"              : JSON.stringify($scope.tab.tags),
            "like_users"        : $scope.getAuth._id,
            "like"              : 1,
            "user_id"           : $scope.getAuth._id,
            "verifikasi"        : ($scope.getAuth.user_tipe == 'masyarakat') ? 'Belum terverifikasi' : 'Lolos verifikasi',
        };
        console.log(data);

        fetcher.postDraft(data, function(response) {
            if (response.response == 'OK' && response.status_code == 200) {
                // localStorageService.set('draft_res', response.result);
                $scope.draft_result         = response.result;
                // $state.go('inputinformasi');
                console.log('berhasil');
                // console.log(localStorageService.draft_res._id);
                console.log($scope.draft_result);

            } else {
                $scope.errorloginmessage    = response.message;
            }
        });
    };


    // coba upload foto
    // $scope.uploadFiles = function(files, errFiles) {
    //     $scope.files = files;
    //     $scope.errFiles = errFiles;
    //     angular.forEach(files, function(file) {
    //         file.upload = Upload.upload(
    //             // {
    //             // url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
    //             // data: {file: file}
    //             // }
    //
    //
    //
    //             fetcher.putDraft(id, files, function(response){
    //                 console.log(response);
    //                 if
    //             })
    //         );
    //
    //         file.upload.then(function (response) {
    //             $timeout(function () {
    //                 file.result = response.data;
    //             });
    //         }, function (response) {
    //             if (response.status > 0)
    //             $scope.errorMsg = response.status + ': ' + response.data;
    //         }, function (evt) {
    //             file.progress = Math.min(100, parseInt(100.0 *
    //                 evt.loaded / evt.total));
    //         });
    //     });
    // }

    console.log($scope.draft_result);
    // input informasi
    $scope.ikp_konten           = "";
    $scope.ikp_jumlah           = "";
    $scope.ikp_unit             = "";

    $scope.anggaran             = "";
    $scope.sumberanggaran       = "";
    $scope.jeniskegiatan        = "";
    $scope.keterangan           = "";
    $scope.foto                 = "";
    $scope.proposal             = "";



    $scope.submitInformasi      = function(){
        var data = {
            "ikp_konten"            : $scope.ikp_konten,
            "ikp_jumlah"            : $scope.ikp_jumlah,
            "ikp_unit"              : $scope.ikp_unit,
            "anggaran"              : $scope.anggaran,
            "sumberanggaran"        : $scope.sumberanggaran,
            "jeniskegiatan"         : $scope.jeniskegiatan,
            "keterangan"            : $scope.keterangan,
            "keterangan"            : $scope.keterangan,
            "foto"                  : $scope.foto,
            "proposal"              : $scope.proposal,
            "keterangan"            : $scope.keterangan,
            "ikp_verifikasi"        : ($scope.getAuth.user_tipe == 'masyarakat') ? 'Belum terverifikasi' : 'Lolos verifikasi',
            "anggaran_verifikasi"   : ($scope.getAuth.user_tipe == 'masyarakat') ? 'Belum terverifikasi' : 'Lolos verifikasi',
            "proposal_verifikasi"   : ($scope.getAuth.user_tipe == 'masyarakat') ? 'Belum terverifikasi' : 'Lolos verifikasi',
            "foto_verifikasi"       : ($scope.getAuth.user_tipe == 'masyarakat') ? 'Belum terverifikasi' : 'Lolos verifikasi',
            // "user_id"               : $scope.getAuth._id,
        };

        var id = $scope.draft_result._id;

        console.log(data);

        fetcher.putDraft(id, data, function(response) {
            console.log(response);
            if (response.response == 'OK' && response.status_code == 200) {
                $state.go('home');
                console.log('berhasil');
                console.log(data._id);
            } else {
                $scope.errorloginmessage    = response.message;
            }
        });


        // fetcher.postInformasi(data, function(response) {
        //     console.log(response);
        //     if (response.response == 'OK' && response.status_code == 200) {
        //         $state.go('home');
        //         console.log('berhasil');
        //         console.log(data._id);
        //     } else {
        //         $scope.errorloginmessage    = response.message;
        //     }
        // });
    };

    fetchskpd();
    getSKPDModel();
}]);
