module.exports = function(app) {
    app.controller('ListController', ['$scope', '$http', function($scope, $http) {


        var clock = $('.clock').FlipClock(3600, {
            autoStart: false,
            countdown: true
        });


    }])
}
