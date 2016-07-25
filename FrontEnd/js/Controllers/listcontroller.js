module.exports = function(app) {
    app.controller('ListController', ['$scope', '$http','$location', function($scope, $http, $location) {

      $scope.goback = function(){
        $location.path('/lobby');
        console.log('clicked');
      }
        var clock = $('.clock').FlipClock(3600, {
            autoStart: false,
            countdown: true
        });


    }])
}
