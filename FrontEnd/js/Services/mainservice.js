module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        var myPosition = [];


        return {
            getLocation: function(map) {
                GMaps.geolocate({
                    success: function(position) {
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
          //   CreateMarker: function() {
          // var data = myPosition[0]
          //     console.log(data.lat, data.lon)
          //       map.addMarker({
          //           lat:data.lat,
          //           lng:data.lon,
          //           title: 'Logans super special marker',
          //           click: function(e) {
          //               console.log('TSUUUUUUUU')
          //           }
          //       });
          //        map.setCenter(data.lat, data.lon);
          //   },
        };
    }]);
};
