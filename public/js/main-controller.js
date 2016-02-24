(function() {
'use strict';

angular.module('myapp')
  .controller('MainController', MainController);

// MainController.$inject = ['Todo', 'State', '$http', '$cookies', '$location'];
MainController.$inject = ['Todo','$http', '$cookies', '$location'];

function MainController( Todo, $http, $cookies, $location) {
  var vm = this;

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

  // User Logout
  vm.logout = function() {
    localStorage.removeItem("token");
    vm.isLoggedIn = false;
  }

  // read messages
  vm.readMessages = function() {
    Todo.query()
     .$promise.then(function (data) {
       console.log(data);
       vm.messages = data;
     });
  }
  vm.readMessages();



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
