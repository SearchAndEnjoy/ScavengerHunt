module.exports = function(app){
  app.controller('QuestionController',['$scope','$http','MainService',function($scope,$http,MainService){
    $scope.myLoc = MainService.getLocation()
    MainService.MarkerNearMe()
    $scope.marker = function(){
      console.log($scope.myLoc)
      MainService.getLocation();
      MainService.CreateMarker();
    }
}])
}
