module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
        return {
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                      console.log(position.coords.latitude)
                      console.log(position.coords.longitude)
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        map.setZoom(20)
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
            CreateMarker: function() {
                map.addMarker({
                    lat:1,
                    lng:1,
                    title: 'Logans super special marker',
                    click: function(e) {
                        console.log('TSUUUUUUUU')
                    }
                });

            }
        };
    }]);
};
