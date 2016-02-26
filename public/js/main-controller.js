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
                console.log("vm.user", vm.user);
                  return vm.user;
              }
          }
        });

    };

    /*
      check for token in localstorage, if token exist send to about page
      or set vm.isLoggedIn to false
    */
    vm.isLoggedIn = localStorage.token || false;

    // User Authentication
    vm.login = function(form) {
      console.log("vm.log ran");
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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('myapp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $log) {


  $scope.ok = function () {
    console.log("ok event");
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    console.log("cancel event");
    $uibModalInstance.dismiss('cancel');
  };

  $scope.submit = function () {
                  console.log("submit event");
                  $log.log('Submiting user info.');
                  $uibModalInstance.$log.log(JSON.stringify(user));
                  $uibModalInstance.dismiss('cancel');
              };
});
