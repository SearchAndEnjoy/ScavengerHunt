module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService', function($scope, $http, TeamService) {

      $scope.session = function() {
        TeamService.getTeams()
      }
    }])
}
