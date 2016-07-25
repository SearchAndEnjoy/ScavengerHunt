(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('JoinController', ['$scope', '$http', '$location', function($scope, $http, $location) {
            $scope.joinTeamName = '',
            $scope.joinLobbyCode = '',
            $scope.teamName = '',
            $scope.lobbyName = '',
            $scope.lobbyCode = '',
            newGameObj = {
                teamName: $scope.teamName,
                game: {
                    lobbyName: $scope.lobbyName,
                }
            },


        $scope.newSessionCreate = function() {
            console.log("clicked New Session");
            console.log(newGameObj = {
                teamName: $scope.teamName,
                game: {
                    lobbyName: $scope.lobbyName,
                }
            });

            $http({
                url: '/create-game',
                method: 'POST',
                data: JSON.stringify(newGameObj),

            }).then(function(data) {
                console.log(data);
                 $location.path('/lobby');

            }).catch(function(data) {
                console.error('new Session screw up');
                console.log(data);
                // $location.path('/shit')
            });
        };

        $scope.joinSessionCreate = function() {
          joinGameObj = {
              teamName: $scope.joinTeamName,
          },
            console.log("clicked Join Session");
            console.log(joinGameObj)
            // console.log(joinGameObj = {
            //     teamName: $scope.joinTeamName,
            //     game: {
            //         lobbyCode: $scope.joinLobbyCode,
            //     }
            // });
            // $location.path('/available');

            $http({
                url: '/add-team/'+`${$scope.joinLobbyCode}`,
                method: 'post',
                data: JSON.stringify(joinGameObj)
            }).then(function(data) {
              console.log(data);

                // $location.path('');

            }).catch(function() {
                console.error('join Session screw up');
                // $location.path('/shit')
            });
        };


    }]);
};

},{}],3:[function(require,module,exports){
module.exports = function(app) {
    app.controller('ListController', ['$scope', '$http','$location', function($scope, $http, $location) {

      $scope.goback = function(){
        $location.path('/lobby');
        console.log('clicked');
      };

      $scope.init = function () {

        };
        // var clock = $('.clock').FlipClock(3600, {
        //     autoStart: true,
        //     countdown: true
        // });
        $(function(){

            countDown = function(){
                var currentDate = Math.round(new Date() / 1000);

                var clock = $('.clock').FlipClock({
                  clockFace: 'HourlyCounter',
                    countdown: true,
                    callbacks: {
                        init: function() {
                            //store end date If it's not yet in cookies
                            if(!$.cookie('endDate')){
                                // end date = current date + 1 minutes
                                var endDate = Date.now() + 60*60*1000;

                                // store end date in cookies
                                $.cookie('endDate', Math.round(endDate / 1000));
                            }
                        },
                        stop: function() {
                            $('.message').html('The clock has stopped!');
                        },
                    }
                });

                /* counter will be at first 1 min if the user refresh the page the counter will
                   be the difference between current and end Date, so like this counter can
                   continue the countdown normally in case of refresh. */
                var counter = $.cookie('endDate')-currentDate;

                clock.setTime(counter);
                clock.setCountdown(true);

                clock.start();
            }



            //Lanching count down on ready
            countDown();
        });

    }])
}

},{}],4:[function(require,module,exports){
module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService','$location', function($scope, $http, TeamService,$location) {
      TeamService.getTeams()
      $scope.session = function() {
        $location.path('/list')
      }
    }])
}

},{}],5:[function(require,module,exports){
module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http', 'MainService', '$location', function($scope, $http, MainService, $location) {
        MainService.getLocation();
        $scope.myLoc = MainService.getLocation();


        console.log($scope.myLoc);
        //////// back-button function/////////
        $scope.return = function() {
            $location.path('/list')
        }

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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
module.exports = function(app) {
    app.factory('TeamService', ['$http', function($http) {
        return {
          getTeams: function(){
            $http({
                url: '/get-teams',
                method: 'GET',
            }).then(function(data) {
              //JSON.parse(data);
              console.log(data);

            }).catch(function(data) {
              console.log('error! error! bzzzt!')

            });
          }
        }//end of return
    }]);//end of factory
};

},{}],9:[function(require,module,exports){
'use strict';

var app = angular.module('HuntApp', ['ngRoute']);

// Controllers
require('./Controllers/questioncontroller.js')(app);
require('./Controllers/infocontroller.js')(app);
require('./Controllers/startcontroller.js')(app);
require('./Controllers/listcontroller.js')(app);
require('./Controllers/joincontroller.js')(app);
require('./Controllers/lobbycontroller.js')(app);

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
        // controller:'gameovercontroller',
        templateUrl: 'templates/gameover.html'
    });
}]);
},{"./Controllers/infocontroller.js":1,"./Controllers/joincontroller.js":2,"./Controllers/listcontroller.js":3,"./Controllers/lobbycontroller.js":4,"./Controllers/questioncontroller.js":5,"./Controllers/startcontroller.js":6,"./Services/mainservice.js":7,"./Services/teamservice.js":8}]},{},[9])