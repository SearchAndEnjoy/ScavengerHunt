module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','$location', function($scope, $http, TeamService,$location) {

      $scope.session = function() {
        TeamService.getTeams()
      }
    }])
}
