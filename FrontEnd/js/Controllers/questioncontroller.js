module.exports = function(app){
  app.controller('QuestionController',['$scope','$http',function($scope,$http){
    $scope.map = {center: {latitude:32.7765044, longitude: -79.9316274,}, zoom:16};
    console.log('balls')
}])
}
