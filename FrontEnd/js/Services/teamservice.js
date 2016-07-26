module.exports = function(app) {
    app.factory('TeamService', ['$http', function($http) {
        return {
          getTeams: function(){
          var teamName = []
            $http({
                url: '/get-teams',
                method: 'GET',
            }).then(function(response) {
            let data = response.data
              response.data.forEach(function(el){
                teamName.push(el.teamName)
              })
            }).catch(function(response) {
              console.log('error! error! bzzzt!')

            });
            return teamName
          }
        }//end of return
    }]);//end of factory
};
