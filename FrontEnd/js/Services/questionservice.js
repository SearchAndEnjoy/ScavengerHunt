module.exports = function(app) {
    app.factory('QuestionService', ['$http', function($http) {
      var clues = [];

        return {
          getClues: function(){
            $http({
                url: '/get-clues',
                method: 'GET',
            }).then(function(response) {
            // let data = response.data
            console.log('questionservice', response);
              // angular.copy(data, clues)
            }).catch(function(response) {
              console.log('error! error! bzzzt!')

            });
            return clues;
          }
        }//end of return


    }]);
  };
