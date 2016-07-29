module.exports = function(app) {
    app.controller('GameOverController', ['$scope', '$location', '$http', 'MainService', 'TeamService', function($scope, $location, $http, MainService, TeamService) {
        $scope.gameOver = TeamService.getOverInfo();
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
          $scope.currentLocation = MainService.getLocation(map);
          console.log(MainService.getLocation());
        $scope.gameOverButton = function() {
            console.log(TeamService.getOverInfo());
        }

    }]);

};
