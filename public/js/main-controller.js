(function() {
'use strict';

angular.module('myapp')
  .controller('MainController', MainController);

MainController.$inject = ['Todo', 'State', '$http', '$cookies', '$location'];
MainController.$inject = ['$http', '$cookies', '$location'];

function MainController( $http, $cookies, $location) {
  var vm = this;
  vm.selState = '';
  vm.isLoggedIn = false;



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
        console.log(response);
        if (response.status === "success") {
          // Set JWT to localStorage as token and redirect to about page
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

  // // read messages
  // vm.readMessages = function() {
  //   Todo.query()
  //    .$promise.then(function (all) {
  //      vm.messages = all;
  //    });
  // };
  // vm.readMessages();



  // // Add message click handler
  // vm.addMessage = function() {
  //   var message = {"phone": vm.newPhone, "message": vm.newMessage};
  //   $http({
  //       url: '/write',
  //       method: 'POST',
  //       data: message})
  //   .success(function(data) {})
  //   .error(function(data) {
  //       vm.loginerror = "Error in server!";
  //   });
  //   //read message again for update
  //   vm.readMessages();
  // };


}


})();
