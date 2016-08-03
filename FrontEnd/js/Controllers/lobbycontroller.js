module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http', 'TeamService', 'LobbyService', '$location', '$interval', '$route', function($scope, $http, TeamService, LobbyService, $location, $interval, $route) {

        var jq = jQuery.noConflict();
        $scope.startButton = jq.cookie('start');
        $scope.Game = TeamService.getTeams();

        $interval(function() {
                TeamService.refreshTeams();
            }, 5000)

        var checkOurDude = $interval(function() {

            var ready = LobbyService.checkReady().then(function(result) {

                if (result) {

                    //// setting clock end cookie////////////////
                    var endDate = Date.now() + 90 * 60 * 1000;
                    jq.cookie('endDate', Math.round(endDate / 1000));
                    $interval.cancel(checkOurDude);
                    $location.path('/list')

                }
            });

        }, 2000);

        $scope.displayCode = TeamService.getLobbyCode()
            /////////////// game start button
        $scope.session = function() {
            if (jq.cookie('demo')) {
                var endDate = Date.now() + 3 * 60 * 1000;
                jq.cookie('endDate', Math.round(endDate / 1000));
                $http({
                    url: '/start-game',
                    method: 'POST',

                }).then(function(response) {
                    console.log('start game POST working', response)

                    $location.path('/list');
                }).catch(function(response) {
                    console.error('start game POST failed');

                });
            } else {

                ////// setting clock end cookie////////////////
                var endDate = Date.now() + 90 * 60 * 1000;
                jq.cookie('endDate', Math.round(endDate / 1000));
                console.log("clicked Post readyState");
                $http({
                    url: '/start-game',
                    method: 'POST',

                }).then(function(response) {
                    console.log('start game POST working', response)

                    $location.path('/list');

                }).catch(function(response) {
                    console.error('start game POST failed');

                });
            }
        }
    }])
};
