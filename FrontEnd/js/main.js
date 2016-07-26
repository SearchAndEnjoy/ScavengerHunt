let app = angular.module('HuntApp', ['ngRoute']);


// Controllers
require('./Controllers/questioncontroller.js')(app);
require('./Controllers/infocontroller.js')(app);
require('./Controllers/startcontroller.js')(app);
require('./Controllers/listcontroller.js')(app);
require('./Controllers/joincontroller.js')(app);
require('./Controllers/creategamecontroller.js')(app);
require('./Controllers/lobbycontroller.js')(app);

// Services
require('./Services/mainservice.js')(app);
require('./Services/teamservice.js')(app);
require('./Services/questionservice.js')(app);





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
            controller: 'CreateGameController',
            templateUrl: 'templates/newsession.html',
        })
        .when('/join', {
            controller: 'JoinController',
            templateUrl:'templates/joinsession.html',
        })
        .when('/lobby', {
          controller:'LobbyController',
          templateUrl:'templates/lobby.html',
        })
        .when('/list',{
          controller:'ListController',
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
