(function() {
  'use strict';

  angular.module('myApp')
    .controller('NavigationController', ['$state', NavigationController]); //.controller close

  function NavigationController($state) {
    var vm = this;

    vm.logout = function() {
      var answer = window.confirm('Are you sure you want to logout?');
      if (!answer) {
        return false;
      }
      delete localStorage.giblibToken;
      localStorage.isLoggedIn = false;

      $state.go('login');

    };
  }
})();