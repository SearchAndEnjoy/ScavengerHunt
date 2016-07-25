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
            joinGameObj = {
                teamName: $scope.joinTeamName,
                game: {
                    lobbyCode: $scope.joinLobbyCode,
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
                // $location.path('');

            }).catch(function(data) {
                console.error('new Session screw up');
                console.log(data);
                // $location.path('/shit')
            });
        };

        $scope.joinSessionCreate = function() {
            console.log("clicked Join Session");
            console.log(joinGameObj = {
                teamName: $scope.joinTeamName,
                game: {
                    lobbyCode: $scope.joinLobbyCode,
                }
            });
            // $location.path('/available');

            $http({
                url: '/join-game',
                method: 'POST',
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
    app.controller('ListController', ['$scope', '$http', function($scope, $http) {


        var clock = $('.clock').FlipClock(3600, {
            autoStart: false,
            countdown: true
        });


    }])
}

},{}],4:[function(require,module,exports){
module.exports = function(app) {
    app.controller('LobbyController', ['$scope', '$http','TeamService', function($scope, $http, TeamService) {

      $scope.session = function() {
        TeamService.getTeams()
      }
    }])
}

},{}],5:[function(require,module,exports){
module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http', 'MainService','$location', function($scope, $http, MainService,$location) {

        $scope.myLoc = MainService.getLocation()
        $scope.return = function(){
          $location.path('/list')
        }

        $scope.marker = function() {
            console.log($scope.myLoc)
            function distance(lon1, lat1, lon2, lat2) {
                var R = 6371; // Radius of the earth in km
                var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
                var dLon = (lon2 - lon1).toRad();
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                return d;
            }

            /** Converts numeric degrees to radians */
            if (typeof(Number.prototype.toRad) === "undefined") {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180;
                }
            }


                console.log($scope.myLoc);
                console.log(
                    $scope.myLoc[0].lat, $scope.myLoc[0].lon, 32.79147,-79.9337541
                );
                console.log(
                    distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, 32.79147,-79.9337541)
                );
            MainService.CreateMarker();
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
          var myPosition = []
        return {
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                        myPosition = [];
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
              console.log(data)

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