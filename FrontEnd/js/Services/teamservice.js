module.exports = function(app) {
    app.factory('TeamService', ['$http', '$location', function($http, $location) {
      var teamName = [];
      var endGameinfo = [];
        return {
            getTeams: function() {
                // teamName = [];
                $http({
                    url: '/get-teams',
                    method: 'GET',
                }).then(function(response) {
                    let data = response.data.teams
                    console.log(response)
                    data.forEach(function(el) {
                        teamName.push(el.teamName)
                    })
                }).catch(function(response) {
                    console.log('error! error! bzzzt!')

                });
                return teamName;
            }, //end of getTeams
            newSessionCreate: function(a, b) {
              var newGameObj = {
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
                    console.log('This is working new sess POST')
                    $location.path('/lobby')

                }).catch(function(response) {
                    console.error('new Session screw up');
                    console.log(response);
                    // $location.path('/shit')
                });
            },
            getLobbyCode: function() {
              var lobbyCode = [];
                $http({
                    url: '/get-teams',
                    method: 'GET',

                }).then(function(response) {
                    lobbyCode.push(response.data.lobbyCode)
                    // lobbyCode = response.data.lobbyCode
                    console.log(lobbyCode);

                }).catch(function(response) {
                    console.error('EEERRT');
                    console.log(response);
                })
                return lobbyCode;

            },
            getOverInfo: function(){
              $http({
                url: '/game-over',
                method: 'Get',
              }).then(function(response){
                var response = response.data;
                console.log(response);
                angular.copy(response, endGameinfo)

              }).catch(function(response){
                console.error("gameover fail");
              })
              return endGameinfo;
            },
        } //end of return
    }]); //end of factory
};
