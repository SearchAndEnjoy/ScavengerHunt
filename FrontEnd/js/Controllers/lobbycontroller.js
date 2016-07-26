module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','$location', function($scope, $http, TeamService,$location) {
      $scope.Game = TeamService.getTeams()
      $scope.displayCode = TeamService.getLobbyCode()
      $scope.session = function() {
        $location.path('/list')
      }
    }])
}
