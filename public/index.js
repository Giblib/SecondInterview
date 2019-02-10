'use strict';

var boardApp = angular.module('boardApp', ['ngRoute'])
    .controller('MainController', 
    function MainController($scope, $rootScope, $window, $location, authorizeService) {
        $scope.userNavBar = {
            name: "",
            show: false
        }
        
        $scope.checkAuth = () => {
            var jwt = $window.localStorage.getItem('boardToken');
            if (jwt !== null) {
                authorizeService.checkAuth(jwt)
                .then((response) => {
                    $scope.userNavBar.name = response.data.name;
                    $scope.userNavBar.show = true;
                }, () => {
                    $scope.userNavBar.name = "";
                    $scope.userNavBar.show = false;
                });
            }
            else {
                $scope.userNavBar.name = "";
                $scope.userNavBar.show = false;
                $location.path('login');
            }
        }

        $rootScope.$on('userLoggedIn', function () {
            $scope.checkAuth();
        });

        $scope.logout = () => {
            $window.localStorage.removeItem('boardToken');
            $scope.userNavBar.name = "";
            $scope.userNavBar.show = false;
            $location.path('login');
        };

        $scope.checkAuth();
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .when('/board', {
                templateUrl: 'templates/board.html',
                controller: 'BoardController'
            })
            .otherwise({ redirectTo: '/board' });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });