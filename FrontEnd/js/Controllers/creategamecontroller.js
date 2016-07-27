module.exports = function(app) {
    app.controller('CreateGameController', ['$scope', '$http', '$location', function($scope, $http, $location) {
      $scope.teamName = '',
      $scope.lobbyName = '',
      $scope.lobbyCode = '',
      newGameObj = {
          teamName: $scope.teamName,
          game: {
              lobbyName: $scope.lobbyName,
          }
      },
      $scope.goback = function(){
        $location.path('/start');
        console.log('clicked');
      };
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

    }]);
  };
