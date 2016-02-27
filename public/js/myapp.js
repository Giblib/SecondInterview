'use strict';

angular
  .module('myapp', [
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .when('/comments', {
        templateUrl: 'views/comments.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/',
        templateUrl: 'views/about.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });
  });
