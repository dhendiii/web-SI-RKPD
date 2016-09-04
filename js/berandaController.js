app.controller('berandaController', ['$scope', '$rootScope', '$state', '$stateParams', 'fetcher', 'autocomplete', 'localStorageService', function($scope, $rootScope, $state, $stateParams, fetcher, autocomplete, localStorageService){
// app.controller('berandaController', ['$scope', '$rootScope', '$state', '$stateParams', 'fetcher', function($scope, $rootScope, $state, $stateParams, fetcher){

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;




    // coba pagination
    $scope.drafts           = [];
    $scope.filteredVal      = [];
    $scope.currentPage      = 1;
    $scope.numPerPage       = 10;
    $scope.maxSize          = 5;

    $scope.$watch('currentPage + numPerPage', function() {



        var begin = (($scope.currentPage-1) * $scope.numPerPage);

        console.log(begin);

        end = begin + $scope.numPerPage;
        console.log(end);

        $scope.filteredVal = $scope.drafts.slice(begin, end);
    });
    // coba pagination
    // $scope.user_id          = "";

    var getDrafts        = function(){
        fetcher.getDrafts(function(response) {
            if (response.response == 'OK' && response.status_code == 200) {
                $scope.drafts = response.result;
                console.log($scope.drafts);
            }
        });
    };

    $scope.getAuth          = localStorageService.get('result');

    $scope.showlocation     = "";
    $scope.showtipedraft    = "";

    $scope.count            = function(input){
        return _.size(input);
    };

    $scope.showlocation     = function(cakupan, detail, kelurahan, kecamatan){
        switch (cakupan) {
            case 'kota': return 'Kota Cimahi'; break;
            case 'kecamatan': return kecamatan; break;
            case 'kelurahan': return kelurahan + ', ' + kecamatan; break;
            case 'dusun': return detail + ', ' + kelurahan + ', ' + kecamatan; break;
            default : return 'not valid';
        }
    };

    $scope.showtipedraft= function(draft_tipe){
        if (draft_tipe == "Rancangan") {
            return "label label-usulan";
        } else {
            return "label label-rancangan";
        }
    };

    $scope.showtipeveri= function(verifikasi){
        switch (verifikasi) {
            case 'Belum terverifikasi': return 'label label-verified-yet'; break;
            case 'Tidak lolos verifikasi': return 'label label-verified-not'; break;
            case 'Lolos verifikasi': return 'label label-verified-ok'; break;
            default: return 'label label-default';
        }
    };

    $scope.showtipeuser = function(tipe){
        switch (tipe) {
            case 'masyarakat': return 'usrname_mas'; break;
            case 'pemerintah': return 'usrname_pem'; break;
            default: return ;
        }
    };


    $scope.vote = function(o, state) {
        var data = {};

        switch (state) {
            case 'like': data.like_users = $scope.getAuth._id; break;
            case 'dislike': data.dislike_users = $scope.getAuth._id; break;
            default: break;
        }

        fetcher.putDraft(o._id, data, function(response){
            if (response.response == 'OK' && response.status_code == 200 && !_.isNull(response.result)) {
                o.like      = response.result.like;
                o.dislike   = response.result.dislike;
                // o.countVote = o.lik
                // console.log(response.result.like);
            }
        });
    };

    // $scope.countLike




    //
    // $scope.dummmData = [];
    //
    // var data    = {
    //     "_id": "576c34e744a5790cac14d2b3",
    //     "message": "message",
    //     "draft_tipe": "rancangan",
    //     "status": "rancangan",
    //     "prioritas": 0
    // }
    //
    // $scope.randomArray  = function() {
    //     $scope.dummmData    = _.fill(Array(_.random(1,5)), data);
    // };

    // $scope.randomArray();
    getDrafts();

}]);
