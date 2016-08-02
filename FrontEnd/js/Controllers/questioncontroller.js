module.exports = function(app) {
    app.controller('QuestionController', ['$scope', '$http','$timeout', 'MainService', 'QuestionService', '$location', '$routeParams','$route', function($scope, $http, $timeout, MainService, QuestionService, $location, $routeParams,$route) {
      var jq = jQuery.noConflict();
      // alert(jq.cookie('demo'));
        var map = new GMaps({
            div: '#map',
            lat: 1,
            lng: -1,
        });
        $scope.myLoc = MainService.getLocation(map);
        $scope.clue = QuestionService.getSingleClue($routeParams.clueId);
        $scope.compare= QuestionService.compareAnswers()
        // console.log($scope.compare)
        // console.log($scope.clue)
        var clueId = $routeParams.clueId;

        //$scope.correct = false;
        // console.log($routeParams);

        //////// back-button function/////////
        $scope.return = function() {
            $location.path('/list')
        };

        /////// getting location  checking distance and if passes creates marker/////////
        $scope.marker = function() {
            MainService.getLocation(map);
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
///////////// distance displayed in console////////
            console.log(Math.floor(distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000), "meters");
/////////////////

        // if ((Math.floor(distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {

////////////demo mode code////////////
          if (jq.cookie('demo')) {
            console.log('DEMO mode', jq.cookie('demo'));
            console.log('---------------------------');
            if ((Math.floor(distance($scope.clue.latitude, $scope.clue.longitude, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {
                 alert('here!');
                // $location.path('/list');
                var answerObj = {
                        answerLat: $scope.clue.latitude,
                        answerLong: $scope.clue.longitude,
                    }
                    console.log();
                  var marker = map.addMarker({
                        lat: $scope.clue.latitude,
                        lng: $scope.clue.longitude,
                        title: $scope.clue.locationName,
                        infoWindow: {content: `<h1>${$scope.clue.locationName}</h1>`}
                    });
                    new google.maps.event.trigger( marker, 'click' );
                    // $scope.correct = true;
                $http({
                    url: '/at-location' + '/' + clueId,
                    method: 'PUT',
                    data: answerObj,


                }).then(function(response) {
                  $scope.compare.forEach(function(el,ind){
                     if($scope.clue.clue === el.clue){
                       $scope.compare.splice(ind,1)
                       console.log($scope.compare.length)
                    }
                  })
                  if($scope.compare.length === 0){
                    $timeout(function(){$location.path('/gameover')}, 2000)
                  }
                  // console.log(response.data.clue.id)
                  // console.log($scope.compare)
                    // console.log('clue answer PUT working', answerObj, response)
                }).catch(function(response) {
                    console.error('clue answer PUT failed');


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
            if ((Math.floor(distance($scope.myLoc[0].lat, $scope.myLoc[0].lon, $scope.clue.latitude, $scope.clue.longitude, 'K') * 1000)) <= 50) {
                 alert('here!');
                // $location.path('/list');
                var answerObj = {
                        answerLat: $scope.myLoc[0].lat,
                        answerLong: $scope.myLoc[0].lon,
                    }
                    console.log();
                  var marker = map.addMarker({
                        lat: $scope.myLoc[0].lat,
                        lng: $scope.myLoc[0].lon,
                        title: $scope.clue.locationName,
                        infoWindow: {content: `<h1>${$scope.clue.locationName}</h1>`}
                    });
                    new google.maps.event.trigger(marker,'click' );
                    // $scope.correct = true;
                $http({
                    url: '/at-location' + '/' + clueId,
                    method: 'PUT',
                    data: answerObj,


                }).then(function(response) {
                  $scope.compare.forEach(function(el,ind){
                     if($scope.clue.clue === el.clue){
                       $scope.compare.splice(ind,1)
                       console.log($scope.compare.length)
                    }
                  })
                  if($scope.compare.length === 0){
                    $timeout(function(){$location.path('/gameover')}, 2000)
                  }
                  // console.log(response.data.clue.id)
                  // console.log($scope.compare)
                    // console.log('clue answer PUT working', answerObj, response)
                }).catch(function(response) {
                    console.error('clue answer PUT failed');


                });

            } else {
                alert('not here')
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
