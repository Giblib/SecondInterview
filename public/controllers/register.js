'use strict';

boardApp.controller('RegisterController',
    function RegisterController($scope, $http, $location) {
        $scope.user = {};

        $scope.registerUser = function (user, registerForm) {
            if (registerForm.$valid) {
                $http({
                    method: 'POST',
                    url: '/api/users/register',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (response) {
                    $location.path('login');
                    window.alert("User signed up successfully! Please, log in.");
                }, function (reason) {
                    console.error(reason.data);
                });
            }
        };

        $scope.cancel = function (user) {
            $scope.user = {};
        }
    }
);