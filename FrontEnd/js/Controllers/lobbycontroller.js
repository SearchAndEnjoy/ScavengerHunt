module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','$location','$interval', function($scope, $http, TeamService,$location,$interval) {
      $scope.Game = TeamService.getTeams()
      $scope.displayCode = TeamService.getLobbyCode()
      console.log('working')
      $scope.session = function() {
        ////// setting clock end cookie////////////////
        var endDate = Date.now() + 90*60*1000;
        $.cookie('endDate', Math.round(endDate / 1000));

        $location.path('/list')
      }
      $interval(TeamService.getTeams, 5000);

    }])
    var callAtInterval = function(){console.log('penis')};
}
