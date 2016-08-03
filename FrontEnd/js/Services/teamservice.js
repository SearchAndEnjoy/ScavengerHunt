module.exports = function(app) {
    app.factory('TeamService', ['$http', '$location', function($http, $location) {
        var jq = jQuery.noConflict();
        var teamName = [];
        var endGameinfo = [];
        var teamAnswerPath = [];

        return {
            getTeams: function() {
                teamName = []
                $http({
                    url: '/get-teams',
                    method: 'GET',
                }).then(function(response) {
                    let data = response.data.teams
                    // console.log(data);
                    angular.copy(data, teamName);

                    // do a check to see if the array has changed from the one bound.   if it has do an angular copy, if not do nothing.

                    // console.log(response)
                    // data.forEach(function(el,ind) {
                    //   if(el !== teamName[ind]){teamName.push(el.teamName)
                    //   }
                    //   else{return false}
                    // });
                }).catch(function(response) {
                    console.log('error! error! bzzzt!')

                });
                return teamName
            }, //end of getTeam
            refreshTeams: function() {
                $http({
                    url: '/get-teams',
                    method: 'GET',
                }).then(function(response) {
                    let data = response.data.teams
                    if (teamName === data) {} else if (teamName !== data) {
                        angular.copy(data, teamName);
                    }
                })
            },
            newSessionCreate: function(a, b) {
                var newGameObj = {
                    teamName: a,
                    game: {
                        lobbyName: b,
                    }
                };
                console.log("clicked New Session");
                $http({
                    url: '/create-game',
                    method: 'POST',
                    data: JSON.stringify(newGameObj),

                }).then(function(response) {
                    console.log('This is working new sess POST')
        /////// creates cookie to evaluate who started game and only lets them access start game button////////
                    var date = new Date();
                    date.setTime(date.getTime() + (120 * 60 * 1000));
                    jq.cookie('start', 1, {
                        expires: date
                    });
                    ////////end////////
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
                var unique = []
                var doubles=[]
                response[0].answerList.forEach(function(el,ind){
                  console.log(el.clue.clue)
                    if(el.clue.clue !== unique[ind -1]){
                    unique.push(el.clue.clue);
                }
                else{
                  doubles.push(el.clue.clue)
                }
                })
                console.log(unique)
                console.log(doubles)
                angular.copy(response, endGameinfo)

              }).catch(function(response){
                console.error("gameover fail");
              })
              return endGameinfo;
            },

//////////////  separate answer lists  so that diff routes ////////
            getOverPaths: function(){
              $http({
                url: '/game-over',
                method: 'Get',
              }).then(function(response){
                var teams = [];
                var pos = [];
                var response = response.data;
                  angular.copy(response, teamAnswerPath)
                response.forEach(function(team) {
                  console.log(team);

              });
              }).catch(function(response){
                console.error("gameover fail");
              })
              return teamAnswerPath;
            },
        } //end of return
    }]); //end of factory
};
