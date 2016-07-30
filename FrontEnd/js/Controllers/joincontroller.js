module.exports = function(app) {
    app.controller('JoinController', ['$scope', '$http', '$location', 'TeamService', function($scope, $http, $location, TeamService) {
        $scope.joinTeamName = '',
            $scope.joinLobbyCode = '',
            $scope.teamName = '',
            $scope.lobbyName = '',
            $scope.lobbyCode = '',

            $scope.goback = function() {
                $location.path('/start');
                console.log('clicked');
            };
        $scope.newSessionCreate = function() {
          if ($scope.lobbyName === '') {
            alert("Please Enter Lobby Name");

          }else if ($scope.teamName === '') {
            alert('Please Enter Team Name')
          }else {
            TeamService.newSessionCreate($scope.teamName, $scope.lobbyName);
          }
        }
        // doubling up on stuff in teamservice.js check make sure there are no issues


        /////////// join session http call////////////
        $scope.joinSessionCreate = function() {
            var joinGameObj = {
                    teamName: $scope.joinTeamName,
                }
                console.log("clicked Join Session");
            // console.log(joinGameObj)

            // $location.path('/available');

            $http({
                url: '/add-team/' + `${$scope.joinLobbyCode}`,
                method: 'post',
                data: JSON.stringify(joinGameObj)
            }).then(function(data) {
                // console.log(data);

                $location.path('/lobby');

            }).catch(function() {
                console.error('join Session screw up');
                alert('Please enter an existing code')
                    // $location.path('/shit')
            });
        };


    }]);
};
