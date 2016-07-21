module.exports = function(app){
  app.controller('StartController',['$scope','$http','$location',function($scope,$http,$location){

$scope.info = function(){
  $location.path('/info1')
  console.log('something')
}
$scope.newsession = function(){
$location.path('/create')
}
$scope.joinsession = function(){
  $location.path('/join')
}

}])
}
