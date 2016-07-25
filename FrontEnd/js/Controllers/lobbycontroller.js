module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','$location', function($scope, $http, TeamService,$location) {
      TeamService.getTeams()
      $scope.session = function() {
        $location.path('/list')g
      }
    }])
}
