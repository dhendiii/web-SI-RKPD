app.controller('inputinformasiController', ['$scope', '$state', 'fetcher', 'autocomplete', 'localStorageService', function($scope, $state, fetcher, autocomplete, localStorageService){
    $scope.step = 0;
    $scope.buttonplaceholder    = '#A9A9AD';

    $scope.listunit             = autocomplete.getUnit();

    //cobain dynamic select
    $scope.selected             = {};
    $scope.dataLokasi           = autocomplete.getKelurahan();



    // console.log($scope.tags);

    $scope.getAuth              = localStorageService.get('result');
    // $scope.getDraft             =


    $scope.ikp_konten           = "";
    $scope.ikp_jumlah           = "";
    $scope.ikp_unit             = "";

    $scope.anggaran             = "";
    $scope.sumberanggaran       = "";
    $scope.jeniskegiatan        = "";
    $scope.keterangan           = "";
    $scope.foto                 = "";
    $scope.proposal             = "";
    // $scope.user_id              = "";
    // $scope.draft_id             = "";
    console.log($scope.draft_id);


    $scope.submitInformasi      = function(){
        var data = {
            "ikp_konten"            : $scope.ikp_konten,
            "ikp_jumlah"            : $scope.ikp_jumlah,
            "ikp_unit"              : $scope.ikp_unit,
            "sumberanggaran"        : $scope.sumberanggaran,
            "jeniskegiatan"         : $scope.jeniskegiatan,
            "keterangan"            : $scope.keterangan,
            "keterangan"            : $scope.keterangan,
            "foto"                  : $scope.foto,
            "proposal"              : $scope.proposal,
            "keterangan"            : $scope.keterangan,
            "ikp_verifikasi"        : ($scope.getAuth.role == "pemerintah") ? 'Rancangan awal' : '',
            "anggaran_verifikasi"   : ($scope.getAuth.role == "pemerintah") ? 'Rancangan awal' : '',
            "proposal_verifikasi"   : ($scope.getAuth.role == "pemerintah") ? 'Rancangan awal' : '',
            "foto_verifikasi"       : ($scope.getAuth.role == "pemerintah") ? 'Rancangan awal' : '',
            "user_id"               : $scope.getAuth._id,
            "draft_id"              : $scope.draft_id,
        };
        console.log(data);

        fetcher.postInformasi(data, function(response) {
            console.log(response);
            if (response.response == 'OK' && response.status_code == 200) {
                $state.go('home');
                console.log('berhasil');
                console.log(data._id)
            } else {
                $scope.errorloginmessage    = response.message;
            }
        });
    };
}]);
