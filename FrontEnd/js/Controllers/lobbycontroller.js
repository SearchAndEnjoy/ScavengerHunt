module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http', 'TeamService', 'LobbyService', '$location', '$interval','$route', function($scope, $http, TeamService, LobbyService, $location, $interval,$route) {

        var jq = jQuery.noConflict();
        $scope.startButton = jq.cookie('start');
        $scope.Game = TeamService.getTeams();

        $interval(function() {
                TeamService.refreshTeams();
            }, 5000)
            //$scope.ready = LobbyService.checkReady();
            // console.log('ready test Lobbyctrl',$scope.ready);

        var checkOurDude = $interval(function() {

            var ready = LobbyService.checkReady().then(function(result) {

                if (result) {
                    //// setting clock end cookie////////////////
                    var endDate = Date.now() + 90 * 60 * 1000;
                    jq.cookie('endDate', Math.round(endDate / 1000));

                    $interval.cancel(checkOurDude);
                    //////////////
                    $location.path('/list')


                }

                // console.log("result", result);
                // console.log("-----------------------------------------------------------------");
            });

        }, 2000);

        $scope.displayCode = TeamService.getLobbyCode()
            // console.log('lobby log', $scope.Game)
/////////////// game start button
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
                       //$route.reload();
///////// location reload causes issue on safari look up/////////

            }).catch(function(response) {
                console.error('start game POST failed');

            });

            // $location.path('/list')
        }
    }])
};
