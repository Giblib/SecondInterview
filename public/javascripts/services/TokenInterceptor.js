// IIFE START //
(function() {
  'use strict';

  angular.module('myApp')
    .factory('TokenInterceptor', function() {

      var $http = $injector.get('$http'); //inject `$http` manually
      return {
        request: function(config) {

          config.headers = config.headers || {};

          if (localStorage.isLoggedIn) {
            config.headers.Authorization = 'Bearer ' + localStorage.giblibToken;
          }

          return config;
        }
      };

    });
})();