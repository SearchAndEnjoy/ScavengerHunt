module.exports = function(app) {
    app.factory('TeamService', ['$http', '$location', '$interval', function($http, $location, $interval) {
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
                    console.log(data);
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
                angular.copy(response, endGameinfo)

              }).catch(function(response){
                console.error("gameover fail");
              })
              return endGameinfo;
            },
            getOverPaths: function(){
              $http({
                url: '/game-over',
                method: 'Get',
              }).then(function(response){
                var teams = [];
                var pos = [];

                var response = response.data;
                console.log(response);
                response.forEach(function(team) {
                  // var teams = [];
                  console.log('team for each loop', team);
                  // teamAnswerPath.push(teams);
                  team.answerList.forEach(function(answers) {
                    // console.log(answers);
                    var pos = [];
                  var teams = [];

                  //
                    pos.push(answers.answerLat, answers.answerLong);
                    teams.push(pos);
                    console.log(teams);
                    teamAnswerPath.push(teams);
                  //   // teams.push([pos]);
                  //
                  })
                  // teams.push([pos]);
                  console.log(teamAnswerPath);
                  // console.log(pos);

                  // console.log('answer list loop',pos);
                  // console.log('teams answer array',teams);

              });
              }).catch(function(response){
                console.error("gameover fail");
              })
              return teamAnswerPath;
            },
        } //end of return
    }]); //end of factory
};
