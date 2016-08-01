module.exports = function(app) {
    app.controller('GameOverController', ['$scope', '$location', '$http', 'MainService', 'TeamService','QuestionService', function($scope, $location, $http, MainService, TeamService,QuestionService) {
      var map = new GMaps({
          div: '#map',
          lat: 1,
          lng: -1,
      });
        // $scope.myLoc = MainService.getLocation(map);
        $scope.clueLoc = QuestionService.finalAnswers()
        $scope.clueLoc.forEach(function(el){
          console.log(el.latitude, el.longitude);
          var marker = map.addMarker({
              lat:el.latitude,
              lng:el.longitude,
              title: 'Logans super special marker',
              infoWindow: {content: `<h1>${el.locationName}</h1>`}
          })
          map.fitZoom()
          map.zoomOut(1)
        })
        $scope.gameOver = TeamService.getOverInfo();
        // $scope.teamPaths = TeamService.getOverPaths();

        $scope.gameOverButton = function() {
            console.log("G-O stuff",TeamService.getOverInfo());
            // console.log('info for paths',TeamService.getOverPaths());
        }
    }]);
};
