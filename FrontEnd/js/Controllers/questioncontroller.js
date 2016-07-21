module.exports = function(app){
  app.controller('QuestionController',['$scope','$http','MainService',function($scope,$http,MainService){

    MainService.getMap()

}])
}
