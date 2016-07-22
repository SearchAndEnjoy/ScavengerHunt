module.exports = function(app){
  app.controller('QuestionController',['$scope','$http','MainService',function($scope,$http,MainService){
    MainService.getLocation();
    $scope.marker = function(){
       MainService.CreateMarker()
       console.log(MainService.myPosition)
    };
}])
}
