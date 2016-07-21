module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        return {
            getMap: function() {
                var map = new GMaps({
                    div: '#map',
                    lat: 32.7807984,
                    lng: -79.9367449,
                });
                return map
            },
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                        map.setCenter(map);
                    },
                    error: function(error) {
                        alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function() {
                        alert("Your browser does not support geolocation");
                    },
                    always: function() {
                        alert("Done!");
                    }
                });

            },
        };
    }]);
};
