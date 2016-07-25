module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
          var myPosition = []
        return {
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                        myPosition = [];
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        map.setZoom(19)
                       myPosition.push({
                         lat:position.coords.latitude,
                         lon:position.coords.longitude
                       });
                        console.log(myPosition);
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
            CreateMarker: function() {
          var data = myPosition[0]
              console.log(data.lat, data.lon)
                map.addMarker({
                    lat:data.lat,
                    lng:data.lon,
                    title: 'Logans super special marker',
                    click: function(e) {
                        console.log('TSUUUUUUUU')
                    }
                });
                map.setCenter(data.lat, data.lon);
            },
          MarkerNearMe: function() {
            // polygon = map.drawPolygon({
            // paths: ???,
            // strokeColor: '#BBD8E9',
            // strokeOpacity: 1,
            // strokeWeight: 3,
            // fillColor: '#BBD8E9',
            // fillOpacity: 0.6
            // });
            map.addMarker({
                lat:32.78495,
                lng:-79.93672,
                // fences:[polygon],
                title: 'What',
            });
          },
        };
    }]);
};
