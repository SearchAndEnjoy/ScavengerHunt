module.exports = function(app) {
    app.factory('QuestionService', ['$http', function($http) {
      var clues = [];
      var singleClue = [];
      var executed = false
      var answers = []
        return {
          getClues: function(){
               if(!executed){
                 executed = true
            $http({
                url: '/get-clues',
                method: 'GET',
            }).then(function(response) {


            let data = response.data
            // console.log(data.teamList)
            // console.log('questionservice', data.clues);
              // angular.copy(data, clues);

              // clues.push(data)
              data.teamList[0].answerList.forEach(function(el){
                answers.push({answer:el.clue.clue})
              })
              data.clues.forEach(function(el,ind){
                // if(el.clue !== answers[0].answer){
                  // console.log(answers)
                  // console.log(ind)
               clues.push({
                   clue:el.clue,
                   id:el.id
                 })
            // }
              })
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
