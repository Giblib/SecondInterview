// IIFE START //
(function() {
  'use strict';

  angular.module('myApp')
    .controller('RegisterCtrl', function($scope, $http) {

      $scope.registerForm = {}

      $scope.onSubmit = function() {
        if ($scope.theRegForm.$valid) {

          // check button submit function
          console.log("This registration submit will direct to Authentication");
          console.log($scope.registerForm);

          //SEND FORM DATA TO API//  
          $http.post('/', $scope.registerForm) //API ENDPOINT to send registartion data.. TBD
            .success(function(data) {

              console.log("Form Data Submitted Succesfully!")

            }).error(function(data) {

              console.log("Failed, Please check your API end point!")

            });
          //SEND FORM DATA TO API - emd//

          // Alert if form does not meet validation 
        } else {

          alert("Some fields were invalid, follow instructions carefully");
        }


      };

    });



  // IIFE START //
})();