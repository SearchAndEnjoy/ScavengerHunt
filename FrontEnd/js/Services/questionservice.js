module.exports = function(app) {
    app.factory('QuestionService', ['$http', function($http) {
      var clues = [];
      var singleClue = [];
      var executed = false

        return {
          getClues: function(){
              if(!executed){
                executed = true
            $http({
                url: '/get-clues',
                method: 'GET',
            }).then(function(response) {
              console.log(clues.length)

            let data = response.data
            // console.log('questionservice', data.clues);
              angular.copy(data, clues);

              // clues.push(data)
              // data.clues.forEach(function(el,ind){
              //   clueCheck.push({
              //     id:el.id,
              //     clue:el.clue
              //   })
              // });
          }).catch(function(response) {
              console.log('error! error! bzzzt!')

            });
          }
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
          },
          compareAnswers: function(){
            return clues
          },
        }//end of return
    }]);
  };
