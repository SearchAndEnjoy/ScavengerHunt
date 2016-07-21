let app = angular.module('HuntApp', ['ngRoute']);


// Controllers
require('./Controllers/questioncontroller.js')(app);
require('./Controllers/infocontroller.js')(app);
require('./Controllers/startcontroller.js')(app);
require('./Controllers/listcontroller.js')(app);

// Services
require('./Services/mainservice.js')(app);




app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/start',
        })
        .when('/start', {
            // controller: 'startcontroller',
            templateUrl: 'templates/start_page.html',
            controller: 'StartController',
        })
        .when('/info1', {
            templateUrl: 'templates/howtoplay1.html',
            controller:'InfoController',
        })
        .when('/info2', {
            templateUrl: 'templates/howtoplay2.html',
            controller: 'InfoController',
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
          controller:'ListController',
          templateUrl:'templates/questionlist.html',
        })
        .when('/question',{
          // controller:'QuestionController',
          templateUrl:'templates/questionpage.html',
        })
        .when('/gameover',{
          // controller:'gameovercontroller',
          templateUrl:'templates/gameover.html',
        });
}]);
