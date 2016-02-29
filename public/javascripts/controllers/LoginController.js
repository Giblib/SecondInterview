// IIFE START //
(function() {
  'use strict';

  angular.module('myApp')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, $http, $state) {

    var vm = this;

    vm.loginForm = {}

    vm.onSubmit = function(loginForm) {

      if (loginForm.$valid) {

        //Send to api -> api checks
        //if data is good - > api returns succcess --> caught by the success function
        //if data not good - > api returns error -> caught by the error function

        $http.post('http://localhost:8080/api/v1/authenticate', vm.loginForm)
          .success(function(data) { //"data" is our argument of the object we receive from auth.js {status, message, token

            if (data.status === 'success') {
              // localStorage.setItem('giblibToken', data.token);
              localStorage.giblibToken = data.token; //access to the token
              localStorage.isLoggedIn = true;

              //use name instead as username is NOT defined?????
              console.log(data.message); //from auth.js Line 52
              console.log(localStorage.giblibToken);
              $state.go('comments');
              

            }
          }).error(function(data) {

            console.log("Failed, Please check your API end point!")

          });

        console.log("user will be authorized, can post comments.")
        console.log(vm.loginForm);

      } else {

        alert("INVALID LOGIN");
      }
    };
  }

})();