module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        return {
            getMap: function(count) {
                var map = new GMaps({
                    div: '#map',
                    lat: -12.043333,
                    lng: -77.028333
          });
          return map
        },
      };
  }]);
};
