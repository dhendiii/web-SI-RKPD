app.factory('fetcher', ['$http', function($http) {
    var baseURL = "http://localhost:9000/";

    var config  = {
        headers             : {'Content-Type': undefined},
        transformRequest    : angular.identity,
    };

    return {

        // getCheckEmail   : function(email, callback) {
        //     $http.get(baseURL + 'auth/' + email).success(callback).error(callback);
        // },
        // postAuth        : function(data, callback) {
        //     $http.post(baseURL + 'auth', data).success(callback).error(callback);
        // },
        // getAnggota      : function(id_organisasi, callback) {
        //     $http.get(baseURL + 'organisasi/' + id_organisasi + '/member').success(callback).error(callback);
        // },
        // showAnggota     : function(id, callback) {
        //     $http.get(baseURL + 'anggota/' + id).success(callback).error(callback);
        // },
        // postAnggota     : function(data, callback) {
        //     $http.post(baseURL + 'anggota', data, config).success(callback).error(callback);
        // },
        // postEvent       : function(data, callback) {
        //     $http.post(baseURL + 'event', data, config).success(callback).error(callback);
        // },

        // musrenbang
        getDraft        : function(_id, callback) {
            $http.get(baseURL + 'draft/' + _id).success(callback).error(callback);
        },
        postDraft       : function(data, callback) {
            $http.post(baseURL + 'draft', data).success(callback).error(callback);
        },
        postInformasi   : function(data, callback) {
            $http.post(baseURL + 'informasi', data, config).success(callback).error(callback);
        },

        //user
        postUser        : function(data, callback) {
            $http.post(baseURL + 'user', data).success(callback).error(callback);
        },
        postLogin       : function(data, callback) {
            $http.post(baseURL + 'user/auth', data).success(callback).error(callback);
        },

        constructPictureLink : function(link) { return baseURL + link; },
    };
}]);
