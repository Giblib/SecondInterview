(function() {
'use strict';

  angular.module('myapp')
   .controller('MainController', MainController);

  MainController.$inject = ['Todo','$http', '$cookies', '$location', '$scope'];

  function MainController( Todo, $http, $cookies, $location, $scope) {
    var vm = this;
    vm.newComment = [];

    /*
      check for token in localstorage, if token exist send to about page
      or set vm.isLoggedIn to false
    */
    vm.isLoggedIn = localStorage.token || false;

    // User Authentication
    vm.login = function(form) {
      var params = {
          "username": form.user.$viewValue,
          "password": form.password.$viewValue
        };
      $http({
          url: '/api/v1/authenticate',
          method: 'POST',
          data: params})
      .success(function(response) {
          // Set JWT to localStorage as token and redirect to about page
          if (response.status === "success") {
            localStorage.setItem("token", response.token);
            vm.isLoggedIn = true;
            $location.path('/about');
          } else {
            vm.loginerror = response.message;
          }
      }).error(function(response) {
          vm.loginerror = response.message;
      });

    };

    // User Logout - remove token from localstorage
    vm.logout = function() {
      localStorage.removeItem("token");
      vm.isLoggedIn = false;
    }

    // read comments
    vm.readComments = function() {
      Todo.query()
       .$promise.then(function (data) {
         vm.comments = data;
       });
    }
    vm.readComments();

    // Add comment click handler
    vm.addComment = function() {
      var comment = new Todo({"text": vm.newComment});
      comment.$save(function(u) {
        vm.comments.unshift(u);
      });
    };

  } //maincontroller fn
})(); //iife
