// IIFE START //
(function() {
  'use strict';

  angular.module('myApp')
    .factory('TokenInterceptor', function() {

      return {//adds token to EACH request. 
        request: function(config) {

          config.headers = config.headers || {};

          if (localStorage.isLoggedIn) {
            config.headers['x-access-token'] = localStorage.giblibToken;
          }

          console.log('var injectory removed test')

          return config;
        }
      };

    });
})();