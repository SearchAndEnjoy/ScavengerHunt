// module.exports = function(app) {
//     app.controller('CreateGameController', ['$scope', '$http', '$location', function($scope, $http, $location) {
//         var jq = jQuery.noConflict();
//         $scope.teamName = '',
//             $scope.lobbyName = '',
//             $scope.lobbyCode = '',
//             newGameObj = {
//                 teamName: $scope.teamName,
//                 game: {
//                     lobbyName: $scope.lobbyName,
//                 }
//             },
//             $scope.goback = function() {
//                 $location.path('/start');
//                 console.log('clicked');
//             };
//         $scope.newSessionCreate = function() {
//             console.log("clicked New Session");
//
//
//             $http({
//                 url: '/create-game',
//                 method: 'POST',
//                 data: JSON.stringify(newGameObj),
//
//             }).then(function(data) {
//                 console.log(data);
//                 jq.cookie('start', 1, {
//                     expires: 1
//                 });
//                 console.log('create cookie test',jq.cookie('start'));
//                 $location.path('/lobby');
//
//             }).catch(function(data) {
//                 console.error('new Session screw up');
//                 console.log(data);
//                 // $location.path('/shit')
//             });
//         };
//
//     }]);
// };







// not being used apparently
