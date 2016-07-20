module.exports = function(app){
  app.controller('QuestionController',['$scope','$http',function($scope,$http){
    $scope.map = {center: {latitude:45, longitude:73,}, zoom:8};
    console.log('balls')
}])
}
