module.exports = function(app) {
    app.factory('LobbyService', ['$http','$location', function($http, $location) {
      //let readyState = false;
      var setReadyState = [];

      return{
        checkReady: function() {

            var readyState = $http({
                url: '/get-game-start',
                method: 'GET',

            }).then(function(response) {

                let data = response.data;

                if (data) {
                  return true;

                }
                return false;

            }).catch(function(response) {
                console.error('checkready err');
                return false;
            });
            return readyState;
        }


      };
    }]);
  };
