module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        var myPosition = [];


        return {
            getLocation: function(map) {
                GMaps.geolocate({
                    success: function(position) {
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        map.setZoom(16)
                       angular.copy([
                         position.coords.latitude,
                         position.coords.longitude
                       ], myPosition);
                        console.log("My current Location",myPosition);
                    },
                    error: function(error) {
                        alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function() {
                        alert("Your browser does not support geolocation");
                    }
                })
                return myPosition;
            },
        };
    }]);
};
