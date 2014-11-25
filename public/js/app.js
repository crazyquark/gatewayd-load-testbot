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
      when('/new', {
        controller: 'BotsCtrl',
        templateUrl: 'views/new_bot.html'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
