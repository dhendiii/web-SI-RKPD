app.controller('berandaController', ['$scope', function($scope){
    console.log('berandaController');

    $scope.dummmData = [];

    var data    = {
        "_id": "576c34e744a5790cac14d2b3",
        "message": "message",
        "draft_tipe": "rancangan",
        "status": "rancangan",
        "prioritas": 0
    }

    $scope.randomArray  = function() {
        $scope.dummmData    = _.fill(Array(_.random(1,5)), data);
    };

    $scope.randomArray();
}]);
