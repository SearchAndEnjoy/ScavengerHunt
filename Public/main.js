(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('InfoController',['$scope','$http','$location',function($scope,$http,$location){

$scope.next = function(){
  $location.path('/info2')
};
$scope.home= function(){
  $location.path('/start')
}
}])
}

},{}],2:[function(require,module,exports){
module.exports = function(app){
  app.controller('QuestionController',['$scope','$http','MainService',function($scope,$http,MainService){
    MainService.getLocation()
    $scope.marker = function(){
       MainService.CreateMarker()
    }
}])
}

},{}],3:[function(require,module,exports){
module.exports = function(app){
  app.controller('StartController',['$scope','$http','$location',function($scope,$http,$location){

$scope.info = function(){
  $location.path('/info1')
  console.log('something')
}
$scope.newsession = function(){
$location.path('/create')
}
$scope.joinsession = function(){
  $location.path('/join')
}

}])
}

},{}],4:[function(require,module,exports){
module.exports = function(app) {
    app.factory('MainService', ['$http', function($http) {
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
        return {
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                      console.log(position.coords.latitude)
                      console.log(position.coords.longitude)
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                        map.setZoom(20)
                    },
                    error: function(error) {
                        alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function() {
                        alert("Your browser does not support geolocation");
                    },
                    always: function() {
                        alert("Done!");
                    }
                });

            },
            CreateMarker: function() {
                map.addMarker({
                    lat:1,
                    lng:1,
                    title: 'Logans super special marker',
                    click: function(e) {
                        console.log('TSUUUUUUUU')
                    }
                });

            }
        };
    }]);
};

},{}],5:[function(require,module,exports){
'use strict';

var app = angular.module('HuntApp', ['ngRoute']);
// Controllers
require('./Controllers/questioncontroller.js')(app);
require('./Controllers/infocontroller.js')(app);
require('./Controllers/startcontroller.js')(app);
require('./Services/mainservice.js')(app);

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
        // controller: 'newcontroller',
        templateUrl: 'templates/newsession.html'
    }).when('/join', {
        // controller: 'joincontroller',
        templateUrl: 'templates/joinsession.html'
    }).when('/lobby', {
        // controller:'lobbycontroller',
        templateUrl: 'templates/lobby.html'
    }).when('/list', {
        // controller:'listcontroller',
        templateUrl: 'templates/questionlist.html'
    }).when('/question', {
        controller: 'QuestionController',
        templateUrl: 'templates/questionpage.html'
    }).when('/gameover', {
        // controller:'gameovercontroller',
        templateUrl: 'templates/gameover.html'
    });
}]);
},{"./Controllers/infocontroller.js":1,"./Controllers/questioncontroller.js":2,"./Controllers/startcontroller.js":3,"./Services/mainservice.js":4}]},{},[5])