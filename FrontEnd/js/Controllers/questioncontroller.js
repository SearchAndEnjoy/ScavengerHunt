module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http', 'MainService', '$location', function($scope, $http, MainService, $location) {
        MainService.getLocation();
        $scope.myLoc = MainService.getLocation();
        console.log($scope.myLoc);

//////// back-button function/////////
        $scope.return = function() {
            $location.path('/list')
        };
///////
        $scope.marker = function() {
            MainService.getLocation();
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

            console.log(Math.floor(distance($scope.myLoc[0].lat,$scope.myLoc[0].lon, 32.7785522, -79.93435,'K') * 1000), "meters");
            if ((Math.floor(distance($scope.myLoc[0].lat,$scope.myLoc[0].lon, 32.7785522, -79.93435,'K') * 1000)) <= 50) {
              alert('here!');
              MainService.CreateMarker();
            }else {
              alert('not here')
            }
        };


    }])
}
