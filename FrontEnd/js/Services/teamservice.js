module.exports = function(app) {
    app.factory('TeamService', ['$http', function($http) {
        return {
          getTeams: function(){
            $http({
                url: '/create-game',
                method: 'GET',
            }).then(function(data) {
              console.log(data)

            }).catch(function(data) {
              console.log('error! error! bzzzt!')

            });
          }
        }//end of return
    }]);//end of factory
};
