(function() {
'use strict';

angular.module('app')
  .controller('MainController', MainController);

MainController.$inject = ['Todo', 'State', '$http', '$cookies', '$location'];

function MainController(Todo, State, $http, $cookies, $location) {
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
    .success(function(data) {
        if (data.result) {
          console.log("login data", data);
          vm.isLoggedIn = true;
          $location.path('/home');
        } else {
          vm.loginerror = "Incorrect username or password!";
        }
    }).error(function(data) {
        vm.loginerror = "Error in server!";
    });

  };

  // read messages
  vm.readMessages = function() {
    Todo.query()
     .$promise.then(function (all) {
       vm.messages = all;
     });
  };
  vm.readMessages();



  // Add message click handler
  vm.addMessage = function() {
    var message = {"phone": vm.newPhone, "message": vm.newMessage};
    $http({
        url: '/write',
        method: 'POST',
        data: message})
    .success(function(data) {})
    .error(function(data) {
        vm.loginerror = "Error in server!";
    });
    //read message again for update
    vm.readMessages();
  };


  //sorting states
  vm.orderByMe = function(x) {
        vm.myOrderBy = x;
        vm.reverse = !vm.reverse;
  }

}


})();
