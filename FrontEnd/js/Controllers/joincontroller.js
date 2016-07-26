module.exports = function(app) {
    app.controller('JoinController', ['$scope', '$http', '$location', function($scope, $http, $location) {
            $scope.joinTeamName = '',
            $scope.joinLobbyCode = '',
            $scope.teamName = '',
            $scope.lobbyName = '',
            $scope.lobbyCode = '',
            newGameObj = {
                teamName: $scope.teamName,
                game: {
                    lobbyName: $scope.lobbyName,
                }
            },
            joinGameObj = {
                teamName: $scope.joinTeamName,
            },


        $scope.newSessionCreate = function() {
            console.log("clicked New Session");
            // console.log(newGameObj = {
            //     teamName: $scope.teamName,
            //     game: {
            //         lobbyName: $scope.lobbyName,
            //     }
            // });

            $http({
                url: '/create-game',
                method: 'POST',
                data: JSON.stringify(newGameObj),

            }).then(function(data) {
                console.log(data);
                 $location.path('/lobby');

            }).catch(function(data) {
                console.error('new Session screw up');
                console.log(data);
                // $location.path('/shit')
            });
        };


/////////// join session http call////////////
        $scope.joinSessionCreate = function() {
          joinGameObj = {
              teamName: $scope.joinTeamName,
          },
            console.log("clicked Join Session");
            // console.log(joinGameObj)

            // $location.path('/available');

            $http({
                url: '/add-team/'+`${$scope.joinLobbyCode}`,
                method: 'post',
                data: JSON.stringify(joinGameObj)
            }).then(function(data) {
              console.log(data);

                // $location.path('');

            }).catch(function() {
                console.error('join Session screw up');
                // $location.path('/shit')
            });
        };


    }]);
};
