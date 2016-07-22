module.exports = function(app) {
    app.controller('JoinController', ['$scope', '$http', '$location', function($scope, $http, $location) {

            $scope.teamName = '',
            $scope.lobbyName = '',
            $scope.lobbyCode = 0,
             newGameObj = {
                    teamName: $scope.teamName,
                    game: {
                        lobbyName: $scope.lobbyName,
                    }
                },


                $scope.newSessionCreate = function() {
                    console.log("clicked New Session");
                    console.log( newGameObj = {
                            teamName: $scope.teamName,
                            game: {
                                lobbyName: $scope.lobbyName,
                            }
                        });

                    $http({
                        url: '/create-game',
                        method: 'POST',
                        data: newGameObj,

                    }).then(function() {
                        // $location.path('');

                    }).catch(function() {
                        console.error('new Session screw up');
                        // $location.path('/shit')
                    });
                };

        // $scope.joinSession = function() {
        //     console.log("clicked New Session");
        //     // $location.path('/available');
        //
        //     $http({
        //         url: '/join-game',
        //         method: 'POST',
        //         data: {
        //
        //             teamName: $scope.teamName,
        //             game: {
        //                 lobbyName: $scope.lobbyName,
        //                 lobbyCode: $scope.lobbyCode,
        //             }
        //
        //         },
        //     }).then(function() {
        //         // $location.path('');
        //
        //     }).catch(function() {
        //         console.error('join Session screw up');
        //         // $location.path('/shit')
        //     });
        // };


    }]);
};
