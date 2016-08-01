module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http', 'TeamService', 'LobbyService', '$location', '$interval', function($scope, $http, TeamService, LobbyService, $location,$interval) {

        var jq = jQuery.noConflict();
        $scope.startButton = jq.cookie('start');
        $scope.Game = TeamService.getTeams();
        $interval(function(){TeamService.refreshTeams()}, 5000)
        $scope.ready = LobbyService.checkReady();
        console.log('ready test Lobbyctrl',LobbyService.checkReady(),$scope.ready);

        // $interval(function() {
        //   console.log("checking for ready", LobbyService.checkReady());
        //     if ($scope.ready == true) {
        //
        // //// setting clock end cookie////////////////
        // var endDate = Date.now() + 90 * 60 * 1000;
        // jq.cookie('endDate', Math.round(endDate / 1000));
        // //////////////
        //
        //         // $location.path('/list')
        //         console.log("ready true");
        //     }
        // }, 10000);

        $scope.displayCode = TeamService.getLobbyCode()
            // console.log('lobby log', $scope.Game)
            ///// game start button
        $scope.session = function() {
            ////// setting clock end cookie////////////////
            var endDate = Date.now() + 90 * 60 * 1000;
            jq.cookie('endDate', Math.round(endDate / 1000));
            ////////////////
            console.log("clicked Post readyState");
            $http({
                url: '/start-game',
                method: 'POST',

            }).then(function(response) {
                console.log('start game POST working', response)
                       $location.path('/list');
                       location.reload()


            }).catch(function(response) {
                console.error('start game POST failed');

            });

            // $location.path('/list')
        }
    }])
};
