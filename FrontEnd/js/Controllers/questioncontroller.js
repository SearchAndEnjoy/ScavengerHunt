module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http', 'MainService','$location', function($scope, $http, MainService,$location) {

        $scope.myLoc = MainService.getLocation()
        $scope.return = function(){
          $location.path('/list')
        }

        $scope.marker = function() {
            console.log($scope.myLoc)
            function distance(lon1, lat1, lon2, lat2) {
                var R = 6371; // Radius of the earth in km
                var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
                var dLon = (lon2 - lon1).toRad();
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                return d;
            }

            /** Converts numeric degrees to radians */
            if (typeof(Number.prototype.toRad) === "undefined") {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180;
                }
            }


                console.log($scope.myLoc);
                console.log(
                    $scope.myLoc[0].lat, $scope.myLoc[0].lon, 32.79147,-79.9337541
                );
                console.log(
                    distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, 32.79147,-79.9337541)
                );
            MainService.CreateMarker();
        };


    }])

}
