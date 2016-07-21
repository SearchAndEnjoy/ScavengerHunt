module.exports = function(app){
  app.controller('InfoController',['$scope','$http','$location',function($scope,$http,$location){

$scope.next = function(){
  $location.path('/info2')
};
$scope.home= function(){
  $location.path('/start')
}
}])
}
