app.controller('berandaController', ['$scope', '$location',function($scope, $location){
    // $scope.getDraft     = getDraft(),
    $scope.go = function (path) {
        $location.path( path );
    };

    $scope.dummmData = [
        {
            "_id": "576c34e744a5790cac14d2b3",
            "message": "message",
            "draft_tipe": "rancangan",
            "status": "rancangan",
            "prioritas": 0
        },
        {
            "_id": "576c351844a5790cac14d2b4",
            "message": "message",
            "draft_tipe": "rancangan",
            "status": "rancangan",
            "prioritas": 0
        },
        {
            "_id": "576c352c44a5790cac14d2b5",
            "message": "message",
            "draft_tipe": "rancangan",
            "status": "rancangan",
            "prioritas": 0
        },
        {
            "_id": "576c35a644a5790cac14d2b6",
            "message": "message2",
            "draft_tipe": "rancangan",
            "status": "rancangan",
            "prioritas": 0,
            "tag_id": [
                "576bb2390cffdbc4762abf9e",
                "576bb2420cffdbc4762abf9f"
            ],
            "information_id": [
                {
                    "information_id": "576add7844a5790fab17788c"
                },
                {
                    "information_id": "576add7e44a5790fab17788f"
                }
            ],
            "feedback_id": [
                {
                    "feedback_id": "576a6ff544a5790fab177887"
                }
            ]
        },
        {
            "_id": "576ce44d44a5790cac14d2b9",
            "message": "lorem ipsum dolor sir amet",
            "draft_tipe": "usulan",
            "status": "not_verified",
            "prioritas": 0,
            "tag_id": [
                "576ab4bd44a5790fab177889",
                "576bb2420cffdbc4762abf9f"
            ]
        }
    ];
}]);
