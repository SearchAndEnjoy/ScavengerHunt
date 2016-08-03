"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('GameOverController', ['$scope', '$location', '$http', 'MainService', 'TeamService', 'QuestionService', function ($scope, $location, $http, MainService, TeamService, QuestionService) {
                var jq = jQuery.noConflict();
                jq.removeCookie('demo');
                var map = new GMaps({
                    div: '#map',
                    lat: 1,
                    lng: -1
                });

                // $scope.myLoc = MainService.getLocation(map);
                $scope.clueLoc = QuestionService.finalAnswers();
                $scope.clueLoc.forEach(function (el) {
                    console.log(el.latitude, el.longitude);
                    var marker = map.addMarker({
                        lat: el.latitude,
                        lng: el.longitude,
                        title: 'Logans super special marker',
                        infoWindow: { content: "<h1>" + el.locationName + "</h1>" }
                    });
                    map.fitZoom();
                    map.zoomOut(1);
                });
                $scope.gameOver = TeamService.getOverInfo();
                $scope.teamPaths = TeamService.getOverPaths();

                //////////button back to start page//////////////
                $scope.gameOverButton = function () {
                    // console.log('info',TeamService.getOverInfo());

                    $location.path('/start');
                };
            }]);
        };
    }, {}], 2: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('InfoController', ['$scope', '$location', function ($scope, $location) {

                $scope.next = function () {
                    $location.path('/info2');
                };
                $scope.home = function () {
                    $location.path('/start');
                };
            }]);
        };
    }, {}], 3: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('JoinController', ['$scope', '$http', '$location', 'TeamService', function ($scope, $http, $location, TeamService) {
                $scope.joinTeamName = '', $scope.joinLobbyCode = '', $scope.teamName = '', $scope.lobbyName = '', $scope.lobbyCode = '', $scope.goback = function () {
                    $location.path('/start');
                    console.log('clicked');
                };
                $scope.newSessionCreate = function () {
                    if ($scope.lobbyName === '') {
                        alert("Please Enter Lobby Name");
                    } else if ($scope.teamName === '') {
                        alert('Please Enter Team Name');
                    } else {
                        TeamService.newSessionCreate($scope.teamName, $scope.lobbyName);
                    }
                };
                // doubling up on stuff in teamservice.js check make sure there are no issues


                /////////// join session http call////////////
                $scope.joinSessionCreate = function () {
                    var joinGameObj = {
                        teamName: $scope.joinTeamName
                    };
                    console.log("clicked Join Session");
                    // console.log(joinGameObj)

                    // $location.path('/available');

                    $http({
                        url: '/add-team/' + ("" + $scope.joinLobbyCode.toLowerCase()),
                        method: 'post',
                        data: JSON.stringify(joinGameObj)
                    }).then(function (data) {
                        // console.log(data);

                        $location.path('/lobby');
                    }).catch(function () {
                        console.error('join Session screw up');
                        alert('Please enter an existing code');
                        // $location.path('/shit')
                    });
                };
            }]);
        };
    }, {}], 4: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('ListController', ['$scope', '$http', '$location', 'QuestionService', '$routeParams', '$route', function ($scope, $http, $location, QuestionService, $routeParams, $route) {
                var jq = jQuery.noConflict();
                $scope.gameObj = QuestionService.compareAnswers();
                QuestionService.getClues();
                console.log($scope.gameObj);

                // $scope.compare= QuestionService.compareAnswers();

                ////// function courtesy of http://questionandanswer.website/question/31670979-flipclock-js-countdown-1hour-without-reset
                ////// flipclock courtesy of flipclockjs.com
                ///// endDate cookie init on lobby start button

                // jq(function(){

                var countDown = function countDown() {
                    var currentDate = Math.round(new Date() / 1000);

                    var clock = jq('.clock').FlipClock({
                        countdown: true,
                        callbacks: {

                            init: function init() {
                                //store end date If it's not yet in cookies
                                if (!jq.cookie('endDate')) {
                                    // end date = current date + 60 minutes
                                    var endDate = Date.now() + 90 * 60 * 1000;
                                    // store end date in cookies
                                    jq.cookie('endDate', Math.round(endDate / 1000));
                                }
                            },
                            stop: function stop() {
                                $location.path('/gameover');
                                $scope.$apply();
                                console.log('clockstopped game over');
                            }
                        }
                    });
                    /* counter will be at first 1 min if the user refresh the page the counter will
                       be the difference between current and end Date, so like this counter can
                       continue the countdown normally in case of refresh. */
                    var counter = jq.cookie('endDate') - currentDate;
                    clock.setTime(counter);
                    clock.setCountdown(true);
                    clock.start();
                };
                //Lanching count down on ready
                countDown();
                // });
                //////// end  clock function///////

            }]);
        };
    }, {}], 5: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('LobbyController', ['$scope', '$http', 'TeamService', 'LobbyService', '$location', '$interval', '$route', function ($scope, $http, TeamService, LobbyService, $location, $interval, $route) {

                var jq = jQuery.noConflict();
                $scope.startButton = jq.cookie('start');
                $scope.Game = TeamService.getTeams();

                $interval(function () {
                    TeamService.refreshTeams();
                }, 5000);
                //$scope.ready = LobbyService.checkReady();
                // console.log('ready test Lobbyctrl',$scope.ready);

                var checkOurDude = $interval(function () {

                    var ready = LobbyService.checkReady().then(function (result) {

                        if (result) {
                            //// setting clock end cookie////////////////
                            var endDate = Date.now() + 90 * 60 * 1000;
                            jq.cookie('endDate', Math.round(endDate / 1000));

                            $interval.cancel(checkOurDude);
                            //////////////
                            $location.path('/list');
                        }

                        // console.log("result", result);
                        // console.log("-----------------------------------------------------------------");
                    });
                }, 2000);

                $scope.displayCode = TeamService.getLobbyCode();
                // console.log('lobby log', $scope.Game)
                /////////////// game start button
                $scope.session = function () {
                    ////// setting clock end cookie////////////////
                    var endDate = Date.now() + 90 * 60 * 1000;
                    jq.cookie('endDate', Math.round(endDate / 1000));
                    ////////////////
                    console.log("clicked Post readyState");
                    $http({
                        url: '/start-game',
                        method: 'POST'

                    }).then(function (response) {
                        console.log('start game POST working', response);

                        $location.path('/list');
                        //$route.reload();
                        ///////// location reload causes issue on safari look up/////////
                    }).catch(function (response) {
                        console.error('start game POST failed');
                    });

                    // $location.path('/list')
                };
            }]);
        };
    }, {}], 6: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('QuestionController', ['$scope', '$http', '$timeout', 'MainService', 'QuestionService', '$location', '$routeParams', '$route', function ($scope, $http, $timeout, MainService, QuestionService, $location, $routeParams, $route) {
                var jq = jQuery.noConflict();
                var map = new GMaps({
                    div: '#map',
                    lat: 1,
                    lng: -1
                });
                $scope.myLoc = MainService.getLocation(map);
                $scope.clue = QuestionService.getSingleClue($routeParams.clueId);
                $scope.compare = QuestionService.getClues();
                // console.log($scope.compare)
                // console.log($scope.clue)
                var clueId = $routeParams.clueId;
                // console.log($routeParams);

                //////// back-button function from individual question page/////////
                $scope.return = function () {
                    $location.path('/list');
                };

                /////// getting location  checking distance and if passes creates marker/////////
                $scope.submitAnswer = function () {

                    // get current location and set it to local scope myLoc - ONLY USED IN REGUALR MODE NOT DEMO MODE
                    $scope.myLoc = MainService.getLocation(map);

                    console.log("click", $scope.myLoc);

                    // Determine distance between two lat/long point
                    function getDistance(lat1, lon1, lat2, lon2, unit) {
                        var radlat1 = Math.PI * lat1 / 180;
                        var radlat2 = Math.PI * lat2 / 180;
                        var radlon1 = Math.PI * lon1 / 180;
                        var radlon2 = Math.PI * lon2 / 180;
                        var theta = lon1 - lon2;
                        var radtheta = Math.PI * theta / 180;
                        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                        dist = Math.acos(dist);
                        dist = dist * 180 / Math.PI;
                        dist = dist * 60 * 1.1515;
                        if (unit == "K") {
                            dist = dist * 1.609344;
                        }
                        if (unit == "N") {
                            dist = dist * 0.8684;
                        }
                        return dist;
                    }

                    ///////////// distance displayed in console////////
                    console.log(Math.floor(getDistance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000), "meters");
                    console.log('-----------------------------------------------');
                    /////////////////

                    ////////////demo mode code////////////
                    if (jq.cookie('demo')) {

                        console.log('DEMO mode', jq.cookie('demo'));
                        console.log('---------------------------');

                        // Check that current location distance is within 50 meters of answer location
                        if (Math.floor(getDistance($scope.clue.latitude, $scope.clue.longitude, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000) <= 50) {

                            alert('here!');
                            // $location.path('/list');

                            // DEMO MODE ONLY - Create answer object from clue location so check Location is always true
                            var answerObj = {
                                answerLat: $scope.clue.latitude,
                                answerLong: $scope.clue.longitude
                            };

                            // Create answer marker for map
                            var marker = map.addMarker({
                                lat: $scope.clue.latitude,
                                lng: $scope.clue.longitude,
                                title: $scope.clue.locationName,
                                infoWindow: { content: "<h1>" + $scope.clue.locationName + "</h1>" }
                            });

                            // Add marker to map for point click event
                            new google.maps.event.trigger(marker, 'click');

                            // Call server to log location answer
                            $http({
                                url: '/at-location/' + clueId,
                                method: 'PUT',
                                data: answerObj

                            }).then(function (response) {

                                console.log('/at-location/', response);

                                $scope.compare.forEach(function (el, ind) {
                                    if ($scope.clue.clue === el.clue) {
                                        $scope.compare.splice(ind, 1);
                                        console.log($scope.compare.length);
                                    }
                                });
                                if ($scope.compare.length === 0) {
                                    $timeout(function () {
                                        $location.path('/gameover');
                                    }, 5000);
                                }

                                // console.log(response.data.clue.id)
                                // console.log($scope.compare)
                                // console.log('clue answer PUT working', answerObj, response)
                            }).catch(function (response) {
                                console.error('clue answer PUT failed');
                            });
                        } else {
                            alert('not here');

                            map.addMarker({
                                lat: $scope.myLoc[0].lat,
                                lng: $scope.myLoc[0].lon,
                                title: $scope.clue.locationName,
                                click: function click(e) {
                                    alert('No Idea Where you are ');
                                }
                            });
                        }
                    }
                    /////////////////// end demo mode/////////////////////
                    else {
                            console.log('reg mode', jq.cookie('demo'));
                            console.log('---------------------------');
                            if (Math.floor(getDistance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000) <= 50) {
                                alert('here!');
                                // $location.path('/list');
                                var answerObj = {
                                    answerLat: $scope.myLoc[0].lat,
                                    answerLong: $scope.myLoc[0].lon
                                };
                                console.log();
                                var marker = map.addMarker({
                                    lat: $scope.myLoc[0].lat,
                                    lng: $scope.myLoc[0].lon,
                                    title: $scope.clue.locationName,
                                    infoWindow: { content: "<h1>" + $scope.clue.locationName + "</h1>" }
                                });
                                new google.maps.event.trigger(marker, 'click');
                                $http({
                                    url: '/at-location' + '/' + clueId,
                                    method: 'PUT',
                                    data: answerObj

                                }).then(function (response) {
                                    $scope.compare.forEach(function (el, ind) {
                                        if ($scope.clue.clue === el.clue) {
                                            $scope.compare.splice(ind, 1);
                                            console.log($scope.compare.length);
                                        }
                                    });
                                    if ($scope.compare.length === 0) {
                                        $timeout(function () {
                                            $location.path('/gameover');
                                        }, 2000);
                                    }
                                    // console.log(response.data.clue.id)
                                    // console.log($scope.compare)
                                    // console.log('clue answer PUT working', answerObj, response)
                                }).catch(function (response) {
                                    console.error('clue answer PUT failed');
                                });
                            } else {
                                alert('not here');
                                var wrongMarker = map.addMarker({
                                    lat: $scope.myLoc[0].lat,
                                    lng: $scope.myLoc[0].lon,
                                    title: $scope.clue.locationName,
                                    infoWindow: { content: "<h1>Wrong!</h1>" }
                                });
                                new google.maps.event.trigger(wrongMarker, 'click');
                            }
                        };
                };

                /////// end marker code///////
            }]);
        };
    }, {}], 7: [function (require, module, exports) {
        module.exports = function (app) {
            app.controller('StartController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
                var jq = jQuery.noConflict();
                jq.removeCookie('start');

                $scope.info = function () {
                    $location.path('/info1');
                    console.log('something');
                }, $scope.newSession = function () {
                    jq.removeCookie('start');
                    $location.path('/create');
                }, $scope.joinSession = function () {
                    jq.removeCookie('start');
                    $location.path('/join');
                }, $scope.demoMode = function () {
                    jq.cookie('demo', true, { expires: 90 * 60 * 1000 });
                    console.log(jq.cookie('demo'));
                };
            }]);
        };
    }, {}], 8: [function (require, module, exports) {
        module.exports = function (app) {
            app.factory('LobbyService', ['$http', '$location', function ($http, $location) {
                //let readyState = false;
                var setReadyState = [];

                return {
                    //////////// remove when sure its not needed//////////

                    // setReadyState: function() {
                    //     console.log("clicked Post readyState");
                    //     $http({
                    //         url: '/start-game',
                    //         method: 'POST',
                    //
                    //     }).then(function(response) {
                    //         console.log('start game POST working')
                    //
                    //     }).catch(function(response) {
                    //         console.error('start game POST failed');
                    //
                    //     });
                    // },
                    checkReady: function checkReady() {

                        var readyState = $http({
                            url: '/get-game-start',
                            method: 'GET'

                        }).then(function (response) {

                            var data = response.data;

                            // console.log('checkReady from service', data);

                            if (data) {
                                return true;
                            }
                            return false;
                        }).catch(function (response) {
                            console.error('checkready err');
                            return false;
                            // console.log(readyState)
                        });
                        return readyState;
                    }

                };
            }]);
        };
    }, {}], 9: [function (require, module, exports) {
        module.exports = function (app) {
            app.factory('MainService', ['$http', function ($http) {
                var myPosition = [];

                return {
                    getLocation: function getLocation(map) {
                        GMaps.geolocate({
                            success: function success(position) {
                                map.setCenter(position.coords.latitude, position.coords.longitude);
                                map.setZoom(16);
                                myPosition.push({
                                    lat: position.coords.latitude,
                                    lon: position.coords.longitude
                                });
                                console.log("My current Location", myPosition);
                            },
                            error: function error(_error) {
                                alert('Geolocation failed: ' + _error.message);
                            },
                            not_supported: function not_supported() {
                                alert("Your browser does not support geolocation");
                            }
                        });
                        return myPosition;
                    }
                };
            }]);
        };
    }, {}], 10: [function (require, module, exports) {
        module.exports = function (app) {
            app.factory('QuestionService', ['$http', '$route', function ($http, $route) {
                var clues = [];
                var singleClue = [];
                var executed = false;
                var answers = [];
                return {
                    loadClues: function loadClues() {
                        if (!executed) {
                            executed = true;

                            $http({
                                url: '/get-clues',
                                method: 'GET'
                            }).then(function (response) {

                                var data = response.data;

                                console.log(data);
                                // console.log('questionservice', data.clues);
                                // angular.copy(data, clues);

                                // clues.push(data)
                                data.clues.forEach(function (el) {
                                    answers.push({
                                        clue: el.clue,
                                        id: el.id,
                                        latitude: el.latitude,
                                        longitude: el.longitude,
                                        locationName: el.locationName
                                    });
                                });
                                data.clues.forEach(function (el, ind) {
                                    clues.push({
                                        clue: el.clue,
                                        id: el.id,
                                        latitude: el.latitude,
                                        longitude: el.longitude
                                    });
                                });
                            }).catch(function (response) {
                                console.log('error! error! bzzzt!');
                            });
                        }
                    },
                    getSingleClue: function getSingleClue(id) {
                        $http({
                            url: '/get-single-clue' + '/' + id,
                            method: 'GET'
                        }).then(function (data) {
                            var data = data.data;
                            console.log('single clue', data);
                            angular.copy(data, singleClue);
                        }).catch(function (data) {
                            console.log('error');
                        });
                        return singleClue;
                    },
                    getClues: function getClues() {
                        return clues;
                    },
                    finalAnswers: function finalAnswers() {
                        return answers;
                    }
                }; //end of return
            }]);
        };
    }, {}], 11: [function (require, module, exports) {
        module.exports = function (app) {
            app.factory('TeamService', ['$http', '$location', function ($http, $location) {
                var jq = jQuery.noConflict();
                var teamName = [];
                var endGameinfo = [];
                var teamAnswerPath = [];

                return {
                    getTeams: function getTeams() {
                        teamName = [];
                        $http({
                            url: '/get-teams',
                            method: 'GET'
                        }).then(function (response) {
                            var data = response.data.teams;
                            // console.log(data);
                            angular.copy(data, teamName);

                            // do a check to see if the array has changed from the one bound.   if it has do an angular copy, if not do nothing.

                            // console.log(response)
                            // data.forEach(function(el,ind) {
                            //   if(el !== teamName[ind]){teamName.push(el.teamName)
                            //   }
                            //   else{return false}
                            // });
                        }).catch(function (response) {
                            console.log('error! error! bzzzt!');
                        });
                        return teamName;
                    }, //end of getTeam
                    refreshTeams: function refreshTeams() {
                        $http({
                            url: '/get-teams',
                            method: 'GET'
                        }).then(function (response) {
                            var data = response.data.teams;
                            if (teamName === data) {} else if (teamName !== data) {
                                angular.copy(data, teamName);
                            }
                        });
                    },
                    newSessionCreate: function newSessionCreate(a, b) {
                        var newGameObj = {
                            teamName: a,
                            game: {
                                lobbyName: b
                            }
                        };
                        console.log("clicked New Session");
                        $http({
                            url: '/create-game',
                            method: 'POST',
                            data: JSON.stringify(newGameObj)

                        }).then(function (response) {
                            console.log('This is working new sess POST');
                            /////// creates cookie to evaluate who started game and only lets them access start game button////////
                            var date = new Date();
                            date.setTime(date.getTime() + 120 * 60 * 1000);
                            jq.cookie('start', 1, {
                                expires: date
                            });
                            ////////end////////
                            $location.path('/lobby');
                        }).catch(function (response) {
                            console.error('new Session screw up');
                            console.log(response);
                            // $location.path('/shit')
                        });
                    },
                    getLobbyCode: function getLobbyCode() {
                        var lobbyCode = [];
                        $http({
                            url: '/get-teams',
                            method: 'GET'

                        }).then(function (response) {
                            lobbyCode.push(response.data.lobbyCode);
                            // lobbyCode = response.data.lobbyCode
                            console.log(lobbyCode);
                        }).catch(function (response) {
                            console.error('EEERRT');
                            console.log(response);
                        });
                        return lobbyCode;
                    },
                    getOverInfo: function getOverInfo() {
                        $http({
                            url: '/game-over',
                            method: 'Get'
                        }).then(function (response) {
                            var response = response.data;
                            angular.copy(response, endGameinfo);
                        }).catch(function (response) {
                            console.error("gameover fail");
                        });
                        return endGameinfo;
                    },

                    //////////////  separate answer lists  so that diff routes ////////
                    getOverPaths: function getOverPaths() {
                        $http({
                            url: '/game-over',
                            method: 'Get'
                        }).then(function (response) {
                            var teams = [];
                            var pos = [];

                            var response = response.data;
                            // console.log('all data',response);
                            angular.copy(response, teamAnswerPath);
                            response.forEach(function (team) {
                                // console.log(team);

                            });
                        }).catch(function (response) {
                            console.error("gameover fail");
                        });
                        return teamAnswerPath;
                    }
                }; //end of return
            }]); //end of factory
        };
    }, {}], 12: [function (require, module, exports) {
        var app = angular.module('HuntApp', ['ngRoute']);
        var jq = jQuery.noConflict();

        // Controllers
        require('./Controllers/questioncontroller.js')(app);
        require('./Controllers/infocontroller.js')(app);
        require('./Controllers/startcontroller.js')(app);
        require('./Controllers/listcontroller.js')(app);
        require('./Controllers/joincontroller.js')(app);
        // require('./Controllers/creategamecontroller.js')(app);
        require('./Controllers/lobbycontroller.js')(app);
        require('./Controllers/gameovercontroller.js')(app);
        // Services
        require('./Services/mainservice.js')(app);
        require('./Services/teamservice.js')(app);
        require('./Services/questionservice.js')(app);
        require('./Services/lobbyservice.js')(app);

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
            })
            // .when('/question/:id '{
            //   controller: 'QuestionController',
            //   templatesUrl:'templates/questionpage.html'
            // })
            .when('/questionpage/:clueId', {
                controller: 'QuestionController',
                templateUrl: 'templates/questionpage.html'
            }).when('/gameover', {
                controller: 'GameOverController',
                templateUrl: 'templates/gameover.html'
            });
        }]);
        // .when('/question/:id '{
        //   controller: 'QuestionController',
        //   templatesUrl:'templates/questionpage.html'
        // })
    }, { "./Controllers/gameovercontroller.js": 1, "./Controllers/infocontroller.js": 2, "./Controllers/joincontroller.js": 3, "./Controllers/listcontroller.js": 4, "./Controllers/lobbycontroller.js": 5, "./Controllers/questioncontroller.js": 6, "./Controllers/startcontroller.js": 7, "./Services/lobbyservice.js": 8, "./Services/mainservice.js": 9, "./Services/questionservice.js": 10, "./Services/teamservice.js": 11 }] }, {}, [12]);