module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','LobbyService','$location', function($scope, $http, TeamService, LobbyService, $location) {
      $scope.Game = TeamService.getTeams();
      $scope.ready = LobbyService.checkReady();
      console.log(LobbyService.checkReady());

      // setInterval(function() {
      //         $scope.Game;
      //         console.log('lobby log', $scope.Game)
      //         console.log($scope.ready);
      // },5000);

      $scope.displayCode = TeamService.getLobbyCode()
      // console.log('lobby log', $scope.Game)
      ///// game start button
      $scope.session = function() {
        ////// setting clock end cookie////////////////
        var endDate = Date.now() + 90*60*1000;
        $.cookie('endDate', Math.round(endDate / 1000));
        ////////////////
            console.log("clicked Post readyState");
            $http({
                url: '/start-game',
                method: 'POST',

            }).then(function(response) {
                console.log('start game POST working', response)

            }).catch(function(response) {
                console.error('start game POST failed');

            });

        // $location.path('/list')
      }
    }])
}
