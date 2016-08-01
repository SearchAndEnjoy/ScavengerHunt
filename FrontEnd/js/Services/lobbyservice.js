module.exports = function(app) {
    app.factory('LobbyService', ['$http','$location', function($http, $location) {
      //let readyState = false;
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

            var readyState = $http({
                url: '/get-game-start',
                method: 'GET',

            }).then(function(response) {

                let data = response.data;

                console.log('checkReady from service', data);

                if (data) {
                  return true;

                }
                return false;

            }).catch(function(response) {
                console.error('checkready err');
                return false;
                // console.log(readyState)
            });
            return readyState;
        }


      };
    }]);
  };
