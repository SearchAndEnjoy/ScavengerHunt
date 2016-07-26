(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('GameOverController',['$scope','$location','MainService',function($scope,$location,Mainservice){


}])
}

},{}],2:[function(require,module,exports){
module.exports = function(app){
  app.controller('InfoController',['$scope','$location',function($scope,$location){

$scope.next = function(){
  $location.path('/info2')
};
$scope.home= function(){
  $location.path('/start')
}
}])
}

},{}],3:[function(require,module,exports){
module.exports = function(app) {
    app.controller('JoinController', ['$scope', '$http', '$location','TeamService', function($scope, $http, $location,TeamService) {
            $scope.joinTeamName = '',
            $scope.joinLobbyCode = '',
            $scope.teamName = '',
            $scope.lobbyName = '',
            $scope.lobbyCode = '',
        $scope.newSessionCreate = function() {
          TeamService.newSessionCreate($scope.teamName,$scope.lobbyName)
        }

        $scope.joinSessionCreate = function() {
          joinGameObj = {
              teamName: $scope.joinTeamName,
          },
            console.log("clicked Join Session");
            // console.log(joinGameObj)

            // $location.path('/available');

            $http({
                url: '/add-team/'+`${$scope.joinLobbyCode}`,
                method: 'post',
                data: JSON.stringify(joinGameObj)
            }).then(function(data) {
              console.log(data);

                $location.path('/lobby');

            }).catch(function() {
                console.error('join Session screw up');
                alert('Please enter an existing code')
                // $location.path('/shit')
            });
        };


    }]);
};

},{}],4:[function(require,module,exports){
module.exports = function(app) {
    app.controller('ListController', ['$scope', '$http','$location', function($scope, $http, $location) {

      $scope.goback = function(){
        $location.path('/lobby');
        console.log('clicked');
      };


////// function courtesy of http://questionandanswer.website/question/31670979-flipclock-js-countdown-1hour-without-reset
////// flipclock courtesy of flipclockjs.com

        $(function(){

            countDown = function(){
                var currentDate = Math.round(new Date() / 1000);

                var clock = $('.clock').FlipClock({
                    countdown: true,
                    callbacks: {

                        init: function() {
                          console.log('first in cbs', $.cookie('endDate'));
                            //store end date If it's not yet in cookies
                            if(!$.cookie('endDate')){
                                // end date = current date + 60 minutes
                                var endDate = Date.now() + 60*60*1000;

                                // store end date in cookies
                                $.cookie('endDate', Math.round(endDate / 1000));
                            }
                        },

                    }
                });
                console.log($.cookie('endDate'));
                /* counter will be at first 1 min if the user refresh the page the counter will
                   be the difference between current and end Date, so like this counter can
                   continue the countdown normally in case of refresh. */
                var counter = $.cookie('endDate')-currentDate;
                //
                clock.setTime(counter);
                clock.setCountdown(true);

                clock.start();
            }



            //Lanching count down on ready
            countDown();
        });

    }])
}

},{}],5:[function(require,module,exports){
module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','$location', function($scope, $http, TeamService,$location) {
      $scope.Game = TeamService.getTeams()
      $scope.displayCode = TeamService.getLobbyCode()
      console.log('working')
      $scope.session = function() {
        $location.path('/list')
      }
    }])
}

},{}],6:[function(require,module,exports){
module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http', 'MainService', '$location', function($scope, $http, MainService, $location) {
        MainService.getLocation();
        $scope.myLoc = MainService.getLocation();
        console.log($scope.myLoc);

//////// back-button function/////////
        $scope.return = function() {
            $location.path('/list')
        };
///////
        $scope.marker = function() {
            MainService.getLocation();
            console.log("click", $scope.myLoc);
            function distance(lat1, lon1, lat2, lon2, unit) {
                var radlat1 = Math.PI * lat1 / 180
                var radlat2 = Math.PI * lat2 / 180
                var radlon1 = Math.PI * lon1 / 180
                var radlon2 = Math.PI * lon2 / 180
                var theta = lon1 - lon2
                var radtheta = Math.PI * theta / 180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist)
                dist = dist * 180 / Math.PI
                dist = dist * 60 * 1.1515
                if (unit == "K") {
                    dist = dist * 1.609344
                }
                if (unit == "N") {
                    dist = dist * 0.8684
                }
                return dist;
            }

            console.log(Math.floor(distance($scope.myLoc[0].lat,$scope.myLoc[0].lon, 32.7785522, -79.93435,'K') * 1000), "meters");
            if ((Math.floor(distance($scope.myLoc[0].lat,$scope.myLoc[0].lon, 32.7785522, -79.93435,'K') * 1000)) <= 50) {
              alert('here!');
              MainService.CreateMarker();
            }else {
              alert('not here')
            }
        };


    }])
}

},{}],7:[function(require,module,exports){
module.exports = function(app){
  app.controller('StartController',['$scope','$http','$location',function($scope,$http,$location){

$scope.info = function(){
  $location.path('/info1')
  console.log('something')
}
$scope.newSession = function(){
$location.path('/create')
}
$scope.joinSession = function(){
  $location.path('/join')
}

}])
}

},{}],8:[function(require,module,exports){
module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
          var myPosition = [];
          
        return {
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        map.setZoom(19)
                       myPosition.push({
                         lat:position.coords.latitude,
                         lon:position.coords.longitude
                       });
                        console.log(myPosition);
                    },
                    error: function(error) {
                        alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function() {
                        alert("Your browser does not support geolocation");
                    }
                })
                return myPosition;
            },
            CreateMarker: function() {
          var data = myPosition[0]
              console.log(data.lat, data.lon)
                map.addMarker({
                    lat:data.lat,
                    lng:data.lon,
                    title: 'Logans super special marker',
                    click: function(e) {
                        console.log('TSUUUUUUUU')
                    }
                });
                map.setCenter(data.lat, data.lon);
            },

          MarkerNearMe: function() {
            map.addMarker({
                lat:32.78495,
                lng:-79.93672,
                // fences:[polygon],
                title: 'What',
            });
          },
        };
    }]);
};

},{}],9:[function(require,module,exports){
module.exports = function(app) {
    app.factory('TeamService', ['$http', '$location', function($http, $location) {
        return {
            getTeams: function() {
                teamName = []
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
                return teamName
            }, //end of getTeams
            newSessionCreate: function(a, b) {
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
                    console.log('This is working')
                    $location.path('/lobby')

                }).catch(function(response) {
                    console.error('new Session screw up');
                    console.log(response);
                    // $location.path('/shit')
                });
            },
            getLobbyCode: function() {
              lobbyCode=[]
                $http({
                    url: '/get-teams',
                    method: 'GET',

                }).then(function(response) {
                    lobbyCode.push(response.data.lobbyCode)
                    // lobbyCode = response.data.lobbyCode
                    console.log(lobbyCode)

                }).catch(function(response) {
                    console.error('EEERRT');
                    console.log(response);
                })
                return lobbyCode
                console.log(lobbyCode)
            }
        } //end of return
    }]); //end of factory
};

},{}],10:[function(require,module,exports){
'use strict';

var app = angular.module('HuntApp', ['ngRoute']);

// Controllers
require('./Controllers/questioncontroller.js')(app);
require('./Controllers/infocontroller.js')(app);
require('./Controllers/startcontroller.js')(app);
require('./Controllers/listcontroller.js')(app);
require('./Controllers/joincontroller.js')(app);
require('./Controllers/lobbycontroller.js')(app);
require('./Controllers/gameovercontroller.js')(app);
// Services
require('./Services/mainservice.js')(app);
require('./Services/teamservice.js')(app);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/start'
    }).when('/start', {
        // controller: 'startcontroller',
        templateUrl: 'templates/start_page.html',
        controller: 'StartController'
    }).when('/info1', {
        templateUrl: 'templates/howtoplay1.html',
        controller: 'InfoController'
    }).when('/info2', {
        templateUrl: 'templates/howtoplay2.html',
        controller: 'InfoController'
    }).when('/create', {
        controller: 'JoinController',
        templateUrl: 'templates/newsession.html'
    }).when('/join', {
        controller: 'JoinController',
        templateUrl: 'templates/joinsession.html'
    }).when('/lobby', {
        controller: 'LobbyController',
        templateUrl: 'templates/lobby.html'
    }).when('/list', {
        controller: 'ListController',
        templateUrl: 'templates/questionlist.html'
    }).when('/question', {
        controller: 'QuestionController',
        templateUrl: 'templates/questionpage.html'
    }).when('/gameover', {
        controller: 'GameOverController',
        templateUrl: 'templates/gameover.html'
    });
}]);
},{"./Controllers/gameovercontroller.js":1,"./Controllers/infocontroller.js":2,"./Controllers/joincontroller.js":3,"./Controllers/listcontroller.js":4,"./Controllers/lobbycontroller.js":5,"./Controllers/questioncontroller.js":6,"./Controllers/startcontroller.js":7,"./Services/mainservice.js":8,"./Services/teamservice.js":9}]},{},[10])