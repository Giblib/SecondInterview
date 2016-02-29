(function() {
  'use strict';

  angular.module('myApp')
    .controller('NavigationController', ['$state', '$http', NavigationController]);

  function NavigationController($state, $http) {
    var vm = this;


    vm.userIsLoggedIn = function() {
      return localStorage.isLoggedIn;
    };

    vm.logout = function() {
      var answer = window.confirm('Are you sure you want to logout?');
      if (!answer) {
        return false;
      }
      delete localStorage.giblibToken;
      delete localStorage.isLoggedIn;

      $state.go('login');
    };
  }
})();