module.exports = function(app) {
    app.controller('JoinController', ['$scope', '$http', '$location','TeamService', function($scope, $http, $location,TeamService) {
            $scope.joinTeamName = '',
            $scope.joinLobbyCode = '',
            $scope.teamName = '',
            $scope.lobbyName = '',
            $scope.lobbyCode = '',

        $scope.newSessionCreate = function() {
          TeamService.newSessionCreate($scope.teamName,$scope.lobbyName)
        }


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

                $location.path('/lobby');

            }).catch(function() {
                console.error('join Session screw up');
                alert('Please enter an existing code')
                // $location.path('/shit')
            });
        };


    }]);
};
