module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http','$timeout', '$interval', 'MainService', 'QuestionService', '$location', '$routeParams','$route', function($scope, $http, $timeout, $interval, MainService, QuestionService, $location, $routeParams,$route) {
      var jq = jQuery.noConflict();
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
        $scope.myLoc = MainService.getLocation(map);

       var refreshMap = $interval(function () {
          $scope.myLoc;
          console.log('map refresh',$scope.myLoc);
        }, 10000);

        $scope.clue = QuestionService.getSingleClue($routeParams.clueId);
        $scope.compare= QuestionService.getClues()
        var clueId = $routeParams.clueId;
//////// back-button function from individual question page/////////
        $scope.backButton = function() {
            $location.path('/list')
        };

/////// getting location  checking distance and if passes creates marker/////////
        $scope.submitAnswer = function() {

            // // get current location and set it to local scope myLoc - ONLY USED IN REGUALR MODE NOT DEMO MODE
            console.log("click", $scope.myLoc);

            // Determine distance between two lat/long point
            function getDistance(lat1, lon1, lat2, lon2, unit) {
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

///////////// distance displayed in console////////
            console.log(Math.floor(getDistance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000), "meters");
            console.log('-----------------------------------------------');
/////////////////

////////////demo mode code////////////
          if (jq.cookie('demo')) {

            console.log('DEMO mode', jq.cookie('demo'));
            console.log('---------------------------');

            // Check that current location distance is within 50 meters of answer location
            if ((Math.floor(getDistance($scope.clue.latitude, $scope.clue.longitude, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {

                 alert('here!');

                // DEMO MODE ONLY - Create answer object from clue location so check Location is always true
                var answerObj = {
                        answerLat: $scope.clue.latitude,
                        answerLong: $scope.clue.longitude,
                }

                // Create answer marker for map
                var marker = map.addMarker({
                      lat: $scope.clue.latitude,
                      lng: $scope.clue.longitude,
                      title: $scope.clue.locationName,
                      infoWindow: {content: `<h1>${$scope.clue.locationName}</h1>`}
                });

                // Add marker to map for point click event
                new google.maps.event.trigger( marker, 'click' );

                // Call server to log location answer
                $http({
                    url: '/at-location/' + clueId,
                    method: 'PUT',
                    data: answerObj,

                }).then(function(response) {

                  console.log('/at-location/', response);

                  $scope.compare.forEach(function(el,ind){
                     if($scope.clue.clue === el.clue){
                       $scope.compare.splice(ind,1)
                       console.log($scope.compare.length)
                    }
                  })
                  if($scope.compare.length === 0){
                    $interval.cancel(refreshMap);
                    $timeout(function(){$location.path('/gameover')}, 3000);
                  }
                }).catch(function(response) {
                    console.error('clue answer PUT failed');
                    alert('Already Answered! Nice Try Pal');
                });

            } else {
                alert('not here')
                map.addMarker({
                      lat: $scope.myLoc[0].lat,
                      lng: $scope.myLoc[0].lon,
                      title: $scope.clue.locationName,
                      click: function(e) {
                          alert('No Idea Where you are ');
                      },
                  });
            }

          }
/////////////////// end demo mode/////////////////////
          else {
            console.log('reg mode', jq.cookie('demo'));
            console.log('---------------------------');

            // get current location and set it to local scope myLoc - ONLY USED IN REGUALR MODE NOT DEMO MODE
            $scope.myLoc = MainService.getLocation(map);

            if ((Math.floor(getDistance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {
                 alert('You got it right!');
                var answerObj = {
                        answerLat: $scope.myLoc[0].lat,
                        answerLong: $scope.myLoc[0].lon,
                    }
                  var marker = map.addMarker({
                        lat: $scope.myLoc[0].lat,
                        lng: $scope.myLoc[0].lon,
                        title: $scope.clue.locationName,
                        infoWindow: {content: `<h1>${$scope.clue.locationName}</h1>`}
                    });
                    new google.maps.event.trigger(marker,'click' );
                $http({
                    url: '/at-location' + '/' + clueId,
                    method: 'PUT',
                    data: answerObj,


                }).then(function(response) {
                  console.log(response)
                  $scope.compare.forEach(function(el,ind){
                     if($scope.clue.clue === el.clue){
                       $scope.compare.splice(ind,1)
                       console.log($scope.compare.length)
                    }
                  })
                  if($scope.compare.length === 0){
                    $timeout(function(){$location.path('/gameover')}, 3000)
                  }

                }).catch(function(response) {
                    console.error('clue answer PUT failed');


                });

            } else {
                alert('Wrong place, try again.')
                var wrongMarker = map.addMarker({
                      lat: $scope.myLoc[0].lat,
                      lng: $scope.myLoc[0].lon,
                      title: $scope.clue.locationName,
                      infoWindow: {content: `<h1>Wrong!</h1>`}
                  })
                  new google.maps.event.trigger(wrongMarker,'click' );
            }
          };
        };

        /////// end marker code///////

    }]);
};
