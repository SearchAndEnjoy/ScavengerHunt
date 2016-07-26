module.exports = function(app) {
    app.factory('TeamService', ['$http','$location', function($http,$location) {
      var lobbyCode = ''
        return {
          getTeams: function(){
            teamName = []
            $http({
                url: '/get-teams',
                method: 'GET',
            }).then(function(response) {
            let data = response.data
            console.log('teamservice', data);
              response.data.teams.forEach(function(el){
                teamName.push(el.teamName)
              })
            }).catch(function(response) {
              console.log('error! error! bzzzt!')

            });

            return teamName
          },//end of getTeams
          newSessionCreate: function(a,b) {
            newGameObj = {
                teamName: a,
                game: {
                    lobbyName: b,
                }
            }
              console.log("clicked New Session");
              $http({
                  url: '/create-game',
                  method: 'POST',
                  data: JSON.stringify(newGameObj),

              }).then(function(response) {
                  var data = response.data;
                  // lobbyCode.push(data.lobbyCode)
                  lobbyCode = data.lobbyCode
                  console.log(lobbyCode)
                  $location.path('/lobby');

              }).catch(function(response) {
                  console.error('new Session screw up');
                  console.log(response);
                  // $location.path('/shit')
              });
              return lobbyCode
          },
        getLobbyCode: function(){
          return lobbyCode
        }
        }//end of return
    }]);//end of factory
};
