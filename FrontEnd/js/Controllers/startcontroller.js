module.exports = function(app){
  app.controller('StartController',['$scope','$http','$location',function($scope,$http,$location){
    var jq = jQuery.noConflict();
    jq.removeCookie('start');

$scope.info = function(){
  $location.path('/info1')
  console.log('something')
}
$scope.newSession = function(){
$location.path('/create')
}
$scope.joinSession = function(){
  $location.path('/join')
}

}])
}
