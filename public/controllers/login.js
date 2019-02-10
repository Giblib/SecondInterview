'use strict';

boardApp.controller('LoginController', 
    function LoginController($scope, $window, $http, $location, $rootScope) {
        $scope.user = {};

        $scope.loginUser = function (user, loginForm) {
            if (loginForm.$valid) {
                $http({
                    method: 'POST',
                    url: '/api/v1/authenticate',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (response) {
                    $window.localStorage.setItem('boardToken', response.data.token);
                    $rootScope.$broadcast('userLoggedIn');
                    $location.path('board');
                }, function (reason) {
                    window.alert("Username or password incorrect.");
                    console.error(reason.data);
                });
            }
        };

        $scope.cancel = function (user) {
            $scope.user = {};
        }
    }
);