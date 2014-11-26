var botsApp = angular.module('botsApp', [
  'ngRoute'
]);

botsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'BotsCtrl',
        templateUrl: 'views/bots.html'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
