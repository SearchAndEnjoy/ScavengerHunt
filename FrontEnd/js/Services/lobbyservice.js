module.exports = function(app) {
    app.factory('LobbyService', ['$http','$location', function($http, $location) {
      var readyState = [];
      var setReadyState = [];

      return{
        //////////// remove when sure its not needed//////////

        // setReadyState: function() {
        //     console.log("clicked Post readyState");
        //     $http({
        //         url: '/start-game',
        //         method: 'POST',
        //
        //     }).then(function(response) {
        //         console.log('start game POST working')
        //
        //     }).catch(function(response) {
        //         console.error('start game POST failed');
        //
        //     });
        // },
        checkReady: function() {
            $http({
                url: '/get-game-start',
                method: 'GET',

            }).then(function(response) {
                // console.log('checkReady works', response);
                let data = response.data;
                angular.copy(data, readyState)
                console.log(readyState)

            }).catch(function(response) {
                console.error('checkready err');
                console.log(readyState)
            });
            return readyState;
        }


      };
    }]);
  };
