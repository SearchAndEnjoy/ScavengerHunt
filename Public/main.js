(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('QuestionController',['$scope','$http',function($scope,$http){
    $scope.map = {center: {latitude:45, longitude:73,}, zoom:8};
    console.log('balls')
}])
}

},{}],2:[function(require,module,exports){
let app = angular.module('HuntApp', ['ngRoute','uiGmapgoogle-maps']);
// Controllers
require('./Controllers/questioncontroller.js')(app);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/start',
        })
        .when('/start', {
            // controller: 'startcontroller',
            templateUrl: 'templates/start_page.html',
        })
        .when('/info1', {
            templateUrl: 'templates/howtoplay1.html',
        })
        .when('/info2', {
            templateUrl: 'templates/howtoplay2.html',
        })
        .when('/create', {
            // controller: 'newcontroller',
            templateUrl: 'templates/newsession.html',
        })
        .when('/join', {
            // controller: 'joincontroller',
            templateUrl:'templates/joinsession.html',
        })
        .when('/lobby', {
          // controller:'lobbycontroller',
          templateUrl:'templates/lobby.html',
        })
        .when('/list',{
          // controller:'listcontroller',
          templateUrl:'templates/questionlist.html',
        })
        .when('/question',{
          controller:'QuestionController',
          templateUrl:'templates/questionpage.html',
        })
        .when('/gameover',{
          // controller:'gameovercontroller',
          templateUrl:'templates/gameover.html',
        });
}]);

},{"./Controllers/questioncontroller.js":1}]},{},[2])