module.exports = function(app) {
    app.controller('ListController', ['$scope', '$http','$location', function($scope, $http, $location) {

      $scope.goback = function(){
        $location.path('/lobby');
        console.log('clicked');
      };

      $scope.init = function () {

        };
        // var clock = $('.clock').FlipClock(3600, {
        //     autoStart: true,
        //     countdown: true
        // });
        $(function(){

            countDown = function(){
                var currentDate = Math.round(new Date() / 1000);

                var clock = $('.clock').FlipClock({
                  clockFace: 'HourlyCounter',
                    countdown: true,
                    callbacks: {
                        init: function() {
                            //store end date If it's not yet in cookies
                            if(!$.cookie('endDate')){
                                // end date = current date + 1 minutes
                                var endDate = Date.now() + 60*60*1000;

                                // store end date in cookies
                                $.cookie('endDate', Math.round(endDate / 1000));
                            }
                        },
                        stop: function() {
                            $('.message').html('The clock has stopped!');
                        },
                    }
                });

                /* counter will be at first 1 min if the user refresh the page the counter will
                   be the difference between current and end Date, so like this counter can
                   continue the countdown normally in case of refresh. */
                var counter = $.cookie('endDate')-currentDate;

                clock.setTime(counter);
                clock.setCountdown(true);

                clock.start();
            }



            //Lanching count down on ready
            countDown();
        });

    }])
}
