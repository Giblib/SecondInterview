
(function() {
  'use strict';

angular.module( 'myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
    $httpProvider.interceptors.push('TokenInterceptor');
    $stateProvider
      .state('login', {
        url:          '/login',
        templateUrl:  'templates/login.html',
        controller:   'LoginCtrl',
        controllerAs: 'vm'
      })

     .state('register', {
        url:          '/register',
        templateUrl:  'templates/register.html',
        controller:   'RegisterCtrl',
        controllerAs: 'vm'

      })

     .state('comments', {
        url:          '/comments',
        templateUrl:  'templates/comments.html',
        controller:   'CommentCtrl',
        controllerAs: 'vm'

       }); 



      $urlRouterProvider.otherwise('/login'); 


  }]);


})();