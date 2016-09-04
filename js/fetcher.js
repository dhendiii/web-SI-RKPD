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
        getDrafts       : function(callback) {
            $http.get(baseURL + 'draft/').success(callback).error(callback);
        },
        getDraft        : function(_id, callback) {
            $http.get(baseURL + 'draft/' + _id).success(callback).error(callback);
        },
        putDraft        : function(_id, data, callback) {
            $http.put(baseURL + 'draft/' + _id, data).success(callback).error(callback);
        },
        postDraft       : function(data, callback) {
            $http.post(baseURL + 'draft', data).success(callback).error(callback);
        },

        postInformasi   : function(data, callback) {
            $http.post(baseURL + 'informasi', data).success(callback).error(callback);
        },

        postFeedback   : function(data, callback) {
            $http.post(baseURL + 'feedback', data).success(callback).error(callback);
        },
        putFeedback     : function(_id, data, callback) {
            $http.put(baseURL + 'feedback/' + _id, data).success(callback).error(callback);
        },
        deleteFeedback     : function(_id, callback) {
            $http.delete(baseURL + 'feedback/' + _id).success(callback).error(callback);
        },





        //user
        postUser        : function(data, callback) {
            $http.post(baseURL + 'user', data).success(callback).error(callback);
        },
        postLogin       : function(data, callback) {
            $http.post(baseURL + 'user/auth', data).success(callback).error(callback);
        },
        getUser        : function(_id, callback) {
            $http.get(baseURL + 'user/' + _id).success(callback).error(callback);
        },


        // skpd
        getSKPD        : function(callback) {
            $http.get(baseURL + 'skpd/').success(callback).error(callback);
        },
        //test
        uploadfile       : function(data, callback) {
            $http.post(baseURL + 'uploadfiles', data).success(callback).error(callback);
        },
        constructPictureLink : function(link) { return baseURL + link; },
    };
}]);
