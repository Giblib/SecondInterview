// IIFE START //
(function() {
  'use strict';

  angular.module('myApp')
    .controller('LoginCtrl', function($scope, $http, $location) {

      $scope.loginForm = {}

      $scope.onSubmit = function() {
        if ($scope.theLoginForm.$valid) {
          // debugger;

//Send to api -> api checks
//if data is good - > api returns succcess --> caught by the success function
//if data not good - > api returns error -> caught by the error function
          $http.post('http://localhost:8080/api/v1/authenticate', $scope.loginForm)
            .success(function(data) { //"data" is the object we receive from auth.js {status, message, token

              if (data.status === 'success') {
                // localStorage.setItem('giblibToken', data.token);
                localStorage.giblibToken = data.token; //access to the token
                localStorage.isLoggedIn = true;
                // localStorage.username = username;//save user name (author of comment)
                console.log(data.message); //from auth.js Line 52
                $location.path('comments');

              }
            }).error(function(data) {

              console.log("Failed, Please check your API end point!")

            });

          console.log("user will be authorized, can post comments.")
          console.log($scope.loginForm);

        } else {

          alert("INVALID LOGIN");
        }
      };
    });

})();