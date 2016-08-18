app.controller('inputdraftController', ['$scope', 'fetcher', 'autocomplete', 'localStorageService', function($scope, fetcher, autocomplete, localStorageService){
    $scope.step = 0;
    $scope.buttonplaceholder    = '#A9A9AD';

    $scope.listKecamatan    = _.keys(autocomplete.getKecamatan());
    $scope.listKelurahan    = [];

    $scope.tags             = [];
    $scope.tagslist         = _.map(autocomplete.getTag(), function(val){ return {'text' : val}; });

    $scope.listskpd             = autocomplete.getSKPD();
    $scope.listunit             = autocomplete.getUnit();

    //cobain dynamic select
    $scope.selected             = {};
    $scope.dataLokasi           = autocomplete.getKelurahan();



    // console.log($scope.tags);

    $scope.next     = function() { $scope.step++; console.log($scope.step);};
    $scope.prev     = function() { $scope.step--; console.log($scope.step);};
    $scope.revert   = function() { $scope.step = 0;};


    $scope.kecamatanChanged = function(data) {
        $scope.lokasi_kecamatan = data;

        $scope.lokasi_kelurahan = '';
        $scope.listKelurahan    = autocomplete.getKecamatan()[data];
    };

    $scope.kelurahanChanged = function(data) {
        $scope.lokasi_kelurahan = data;
    };

    $scope.getAuth        = localStorageService.get('result');


    $scope.errorloginmessage    = '';
    $scope.kegiatan             = "";
    // $scope.draft_tipe           = 0;
    $scope.lokasi_cakupan       = 'kota';
    $scope.lokasi_detail        = "";
    $scope.lokasi_kelurahan     = "";
    $scope.lokasi_kecamatan     = "";
    $scope.tag                  = "";
    $scope.skpd                 = "";
    // $scope.user_id = getAuth._id



    $scope.submitDraft      = function(){
        var data = {
            "kegiatan"          : $scope.kegiatan,
            "draft_tipe"        : ($scope.getAuth.user_tipe = "masyarakat") ? 'usulan' : 'rancangan',
            "lokasi_cakupan"    : $scope.lokasi_cakupan,
            "lokasi_detail"     : $scope.lokasi_detail,
            "lokasi_kelurahan"  : $scope.lokasi_kelurahan.kel,
            "lokasi_kecamatan"  : $scope.lokasi_kecamatan.kec,
            "skpd"              : $scope.skpd.id,
            "tags"              : $scope.tags,
            "user_id"           : $scope.getAuth._id,
        };
        console.log(data);

        fetcher.postDraft(data, function(response) {
            console.log(response);
            if (response.response == 'OK' && response.status_code == 200) {
                console.log('berhasil');
                console.log(data._id)
            } else {
                $scope.errorloginmessage    = response.message;
            }
        });
    };
}]);
