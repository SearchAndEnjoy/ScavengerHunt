module.exports = function(app) {
    app.factory('TeamService', ['$http', function($http) {
        return {
          getTeams: function(){
            $http({
                url: '/get-teams',
                method: 'GET',
                params:{game_id:1},
            }).then(function(data) {
              console.log(data)

            }).catch(function(data) {
              console.log('error! error! bzzzt!')

            });
          }
        }//end of return
    }]);//end of factory
};
