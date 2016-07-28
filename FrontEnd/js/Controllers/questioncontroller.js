module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http', 'MainService', 'QuestionService', '$location', '$routeParams', function($scope, $http, MainService, QuestionService, $location, $routeParams) {
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
        MainService.getLocation(map);
        $scope.myLoc = MainService.getLocation(map);
        console.log($scope.myLoc);
        $scope.clue = QuestionService.getSingleClue($routeParams.clueId);
        console.log($scope.clue);


        console.log($routeParams);
        //////// back-button function/////////
        $scope.return = function() {
            $location.path('/list')
        };

        /////// getting location  checking distance and if passes creates marker/////////
        $scope.marker = function() {
            MainService.getLocation(map);
            console.log("click", $scope.myLoc);

            function distance(lat1, lon1, lat2, lon2, unit) {
                var radlat1 = Math.PI * lat1 / 180
                var radlat2 = Math.PI * lat2 / 180
                var radlon1 = Math.PI * lon1 / 180
                var radlon2 = Math.PI * lon2 / 180
                var theta = lon1 - lon2
                var radtheta = Math.PI * theta / 180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist)
                dist = dist * 180 / Math.PI
                dist = dist * 60 * 1.1515
                if (unit == "K") {
                    dist = dist * 1.609344
                }
                if (unit == "N") {
                    dist = dist * 0.8684
                }
                return dist;
            }
            console.log(Math.floor(distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000), "meters");
            // if ((Math.floor(distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {
            if ((Math.floor(distance($scope.clue.latitude, $scope.clue.longitude, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {
                alert('here!');
                MainService.CreateMarker();

                $http({
                    url: '/start-game',
                    method: 'POST',

                }).then(function(response) {
                    console.log('clue answer POST working')

                }).catch(function(response) {
                    console.error('clue answer POST failed');

                });

            } else {
                alert('not here')
            }
        };
        /////// end marker code///////

    }])
}
