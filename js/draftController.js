app.controller('draftController', ['$scope', '$rootScope', '$state', '$stateParams', 'fetcher', 'autocomplete', 'localStorageService', function($scope, $rootScope, $state, $stateParams, fetcher, autocomplete, localStorageService){
    'use strict';


    $scope.testValue = 0;

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $scope.draft_id     = $stateParams.draft_id;  //*** Exists! ***//
    $scope.draft       = [];

    console.log($scope.draft_id);

    $scope.listSubmitInfo       = autocomplete.getSubmitInfo();
    $scope.listunit             = autocomplete.getUnit();
    $scope.ikp_unit             = "";

    $scope.getAuth          = localStorageService.get('result');
    // $scope.url_editdraft    = "/$scope."

    $scope.showlocation     = "";
    $scope.showtipedraft    = "";

    $scope.Model            = {};
    $scope.konten           = "";
    $scope.Model.konten_informasi = "";
    $scope.Model.konten_komentar  = "";
    $scope.Model.konten_request   = "";
    $scope.Model.foto             = "";
    $scope.Model.proposal         = "";
    $scope.Model.tipe             = "";

    $scope.clearInput = function(){
        $scope.Model.konten_informasi = "";
        $scope.Model.konten_komentar  = "";
        $scope.Model.konten_request   = "";
        $scope.Model.foto             = "";
        $scope.Model.proposal         = "";
        $scope.Model.tipe             = "";
    };

    // $scope.getKonten    = function(komentar, informasi, request){
    //     switch (konten) {
    //         case !$scope.Model.konten_informasi : return $scope.konten = $scope.Model.konten_informasi; break;
    //         case !$scope.Model.konten_komentar : return $scope.konten = $scope.Model.konten_komentar; break;
    //         case !$scope.Model.konten_request : return $scope.konten = $scope.Model.konten_request; break;
    //         default: return null;
    //     }
    // };
    // $scope.getKonten    = "";
    var getKonten = function(){
        if ($scope.Model.konten_komentar != ""){
            return $scope.Model.konten_komentar;
        } else if ($scope.Model.konten_informasi != ""){
            return $scope.Model.konten_informasi;
        } else if ($scope.Model.konten_request != ""){
            return $scope.Model.konten_request;
        }
    };

    // $scope.getTipe    = "";
    var getTipe = function(){
        if ($scope.Model.konten_komentar != ""){
            return 'Komentar';
        } else if ($scope.Model.konten_informasi != ""){
            return $scope.Model.tipe.Lengkap;
        } else if ($scope.Model.konten_request != ""){
            return 'Request informasi';
        }
    };

    var getStatus = function(){
        if ($scope.Model.konten_komentar){
            return null;
        } else if ($scope.Model.konten_informasi){
            return "Belum terverifikasi";
        } else if ($scope.Model.konten_request){
            return 'Belum ditanggapi';
        }
    };


    var getDraft        = function(id){
        fetcher.getDraft(id, function(response){
            if (response.response == 'OK' && response.status_code == 200) {
                $scope.draft    = response.result;
                console.log($scope.draft);
            }
        });
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

    $scope.showtipefeed= function(feed){
        switch (feed) {
            case 'Komentar': return 'label label-comment'; break;
            case 'Request informasi': return 'label label-rqst'; break;
            default: return 'label label-informasi';
        }
    };

    $scope.showverifeed= function(verifikasi){
        switch (verifikasi) {
            case 'Belum terverifikasi': return 'label label-verified-yet'; break;
            case 'Belum ditanggapi': return 'label label-verified-yet'; break;
            case 'Tidak lolos verifikasi': return 'label label-verified-not'; break;
            case 'Sudah ditanggapi': return 'label label-verified-ok'; break;
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

    $scope.voteFeed = function(o, state) {
        var data = {};

        switch (state) {
            case 'like': data.like_users = $scope.getAuth._id; break;
            case 'dislike': data.dislike_users = $scope.getAuth._id; break;
            default: break;
        }

        fetcher.putFeedback(o._id, data, function(response){
            if (response.response == 'OK' && response.status_code == 200 && !_.isNull(response.result)) {
                o.like      = response.result.like;
                o.dislike   = response.result.dislike;
                // o.countVote = o.lik
                // console.log(response.result.like);
            }
        });
    };

    // $scope.status = "";
    // $scope.status_ket = "";

    $scope.updateFeedStatus = function(o, data1, data2){
        var data = {
            'status' : data1,
            'status_ket' : (data1 == 'Tidak lolos verifikasi') ? data2 : null,
        };

        fetcher.putFeedback(o._id, data, function(response){
            if (response.response == 'OK' && response.status_code == 200 && !_.isNull(response.result)) {
                console.log(result);
                o.status            = response.result.status;
                o.status_ket        = response.result.status_ket;

            }
        });
    };

    // $scope.deleteFeedback = function(o){
    //     fetcher.deleteFeedback(o._id, function(response){
    //         console.log(response);
    //         // if (response.response == 'OK' && response.status_code == 200) {
    //         //     console.log('berhasil');
    //         //
    //         // }
    //     });
    // };

    console.log($scope.getAuth);

    $scope.submitFeedback   = function(){

        var data = {
            "konten"        : getKonten(),
            "tipe"          : getTipe(),
            "like"          : 1,
            "like_users"    : $scope.getAuth._id,
            "user_id"       : $scope.getAuth._id,
            "status"        : getStatus(),
            "draft_id"      : $scope.draft_id,
        };
        console.log(data);

        fetcher.postFeedback(data, function(response) {
            if (response.response == 'OK' && response.status_code == 200) {
                // localStorageService.set('draft_res', response.result);

                response.result.user    = $scope.getAuth;
                $scope.draft.feedback.push(response.result);
                console.log(response.result);

            } else {
                $scope.errorloginmessage    = response.message;
            }

        });

        $scope.clearInput();
    };

    // console.log(getAuth;

    getDraft($scope.draft_id);
}]);
