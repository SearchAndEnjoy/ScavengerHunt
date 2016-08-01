module.exports = function(app) {
    app.factory('QuestionService', ['$http','$route', function($http,$route) {
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
            console.log(data)
            // console.log('questionservice', data.clues);
              // angular.copy(data, clues);

              // clues.push(data)
              data.clues.forEach(function(el){
                answers.push({
                  clue:el.clue,
                  id:el.id,
                  latitude:el.latitude,
                  longitude:el.longitude,
                  locationName:el.locationName
              })
              })
              data.clues.forEach(function(el,ind){
               clues.push({
                   clue:el.clue,
                   id:el.id,
                   latitude:el.latitude,
                   longitude:el.longitude
                 })
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
          finalAnswers: function(){
            return answers
          }
        }//end of return
    }]);
  };
