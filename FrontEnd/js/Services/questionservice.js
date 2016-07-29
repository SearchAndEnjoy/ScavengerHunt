module.exports = function(app) {
    app.factory('QuestionService', ['$http', function($http) {
      var clues = [];
      var singleClue = [];

        return {
          getClues: function(){
            $http({
                url: '/get-clues',
                method: 'GET',
            }).then(function(response) {
            let data = response.data.clues
            console.log('questionservice', data);
              angular.copy(data, clues)
            }).catch(function(response) {
              console.log('error! error! bzzzt!')

            });
            return clues;
          },
          getSingleClue: function(id) {
            $http({
              url:'/get-single-clue' + '/' + id,
              method: 'GET',
            }).then(function(data){
              var data = data.data
              console.log('single clue', data);
              angular.copy(data, singleClue)
            }).catch(function(data){
              console.log('error');
            });
            return singleClue;
          }
        }//end of return
    }]);
  };
