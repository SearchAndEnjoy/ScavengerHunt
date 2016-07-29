module.exports = function(app) {
    app.controller('GameOverController', ['$scope', '$location', 'MainService', 'TeamService', function($scope, $location, MainService, TeamService) {
        $scope.gameOver = TeamService.getOverInfo();
        console.log('this is gameover');

        $scope.gameOverButton = function(){
          console.log(TeamService.getOverInfo());
        }

    }]);

};
