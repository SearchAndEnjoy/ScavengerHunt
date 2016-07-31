module.exports = function(app) {
    app.controller('GameOverController', ['$scope', '$location', '$http', 'MainService', 'TeamService', function($scope, $location, $http, MainService, TeamService) {
      var map = new GMaps({
          div: '#map',
          lat: 1,
          lng: -1,
      });
        $scope.myLoc = MainService.getLocation(map);

        $scope.gameOver = TeamService.getOverInfo();
        $scope.teamPaths = TeamService.getOverPaths();

        $scope.gameOverButton = function() {
            // console.log("G-O stuff",TeamService.getOverInfo());
            console.log('info for paths',TeamService.getOverPaths());
        }
    }]);
};
