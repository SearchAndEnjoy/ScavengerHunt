let app = angular.module('HuntApp', ['ngRoute']);

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
          // controller:'questioncontroler',
          templateUrl:'templates/questionpage.html',
        })
        .when('/gameover',{
          // controller:'gameovercontroller',
          templateUrl:'templates/gameover.html',
        });
}]);
