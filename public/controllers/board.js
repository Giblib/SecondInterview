'use strict';

boardApp.controller('BoardController', 
    function BoardController($scope, $http, $window, $location, $route, $rootScope, authorizeService) {
        $scope.comment = {};
        $scope.comments = {};
        $scope.user = {};

        $scope.commentText = (comment, commentForm) => {
            if (commentForm.$valid) {
                $scope.checkAuth();

                $http({
                    method: 'POST',
                    url: '/api/comments/comment',
                    data: { text: comment.text, id: $scope.user.id},
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(() => {
                    $scope.comment = {};
                    $route.reload();
                }, (reason) => {
                    console.error(reason.data);
                });
            }
        }

        $scope.fillComments = () => {
            $http({
                method: 'GET',
                url: '/api/comments',
                data: {},
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then((response) => {
                $scope.comments = response.data;
            }, (reason) => {
                console.error(reason.data);
            });
        }

        $scope.checkAuth = () => {
            var jwt = $window.localStorage.getItem('boardToken');
            if (jwt !== null) {
                authorizeService.checkAuth(jwt)
                .then((response) => {
                    $scope.user = response.data;
                    $scope.fillComments();
                }, () => {
                    $scope.user = {};
                    $window.localStorage.removeItem('boardToken');
                    $rootScope.$broadcast('userLoggedIn');
                });
            }
            else {
                $rootScope.$broadcast('userLoggedIn');
            }
        }

        $scope.checkAuth();
    }
);