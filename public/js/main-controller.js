(function() {
'use strict';

  angular.module('myapp')
   .controller('MainController', MainController);

  MainController.$inject = ['Todo','$http', '$location', '$scope', '$uibModal'];

  function MainController( Todo, $http, $location, $scope, $uibModal) {
    var vm = this;
    vm.newComment = [];

    /*
      MODAL IMPLMENTATION
    */

    vm.open = function (user) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
              user: function () {
                  return vm.user;
              }
          }
        }); //modalInstance

        modalInstance.result.then(function (user) {
            // Redirect to the logged-in function
            vm.login(user);
        }, function () {
            // optional function. Do something if the user cancels.
        }); //result

    };

    /*
      check for token in localstorage, if token exist send to about page
      or set vm.isLoggedIn to false
    */
    vm.isLoggedIn = localStorage.token || false;

    // User Authentication
    vm.login = function(user) {
      var params = {
          "username": user.username,
          "password": user.password
        };
      $http({
          url: '/api/v1/authenticate',
          method: 'POST',
          data: params})
      .success(function(response) {
          // Set JWT to localStorage as token and redirect to about page
          if (response.status === "success") {
            localStorage.setItem("token", response.token);
            vm.isLoggedIn = localStorage.token || false;
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
      vm.isLoggedIn = localStorage.token || false;
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

