let app = angular.module('HuntApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/start',
        })
        .when('/start', {
            // controller: 'startcontroller',
            templateUrl: 'Templates/start_page.html',
        })
        .when('/info1', {
            templateUrl: 'Templates/howtoplay1.html',
        })
        .when('/info2', {
            templateUrl: 'Templates/howtoplay2.html',
        })
        .when('/create', {
            // controller: 'newcontroller',
            templateUrl: 'Templates/newsession.html',
        })
        .when('/join', {
            // controller: 'joincontroller',
            templateUrl:'Templates/joinsession.html',
        })
        .when('/lobby', {
          // controller:'lobbycontroller',
          templateUrl:'Templates/lobby.html',
        })
        .when('/list',{
          // controller:'listcontroller',
          templateUrl:'Templates/questionlist.html',
        })
        .when('/question',{
          // controller:'questioncontroler',
          templateUrl:'Templates/questionpage.html',
        })
        .when('/gameover',{
          // controller:'gameovercontroller',
          templateUrl:'gameover.html',
        });
}]);
