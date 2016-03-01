'use strict';


var app = angular
  .module('publicApp', ['ngRoute'
  ]);

  /*<<<<<<<<<<<<<<<<<<<<<<SERVICES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


app.factory('Auth', function ($http, $location, $window) {

  var signin = function(user){

    return $http({
      url:"/api/v1/authenticate",
      method: 'POST',
      data: user
    })
  };

  var isAuth = function(){
    return !!$window.localstorage.getItem('token');
  };

  var signout = function(){
    $window.localstorage.removeitem('token');
    $location.path('/signin');
  };

  var authTester = "auth factory working";


  
  return {
    signin: signin,
    isAuth: isAuth,
    signout: signout,
    authTester: authTester
  };
});

app.factory('Comments', function ($q,$http, $location, $window) {
  var deferred = $q.defer();

  var postComment = function(comment){
    
    return $http({
      url:"/api/v1/comments",
      method: 'POST',
      data: comment
    });
  };

  var retrieveComments = function(tokenObj){
    console.log('inside comments factory');

  
    return $http({
      url:"/api/v1/comments",
      method: 'GET',
      data: tokenObj
    })

  };

  var signout = function(){
    $window.localstorage.removeitem('token');
    $location.path('/signin');
  };

  var authTester = "auth factory working";


  
  return {
    postComment: postComment,
    retrieveComments: retrieveComments
  };
});

/*<<<<<<<<<<<<<<<<<<<<<<CONTROLLERS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
  app.controller('MainController',function ($scope) {
    $scope.test = "main controller"
    
  });

  app.controller('AuthController',function ($scope,$window,$location, $http, Auth) {
    $scope.user = {};
    $scope.test = "auth controller";


    $scope.test_two = Auth.authTester;

    $scope.signin = function(){

      var user = $scope.user;
      //receive token or undefined from backend
      Auth.signin($scope.user).then(function(res){
        $window.localStorage.setItem('token',res.data.token);
        $location.path('/comments');
      }, function(error){
        console.log('there was an error with ajax call: ', error);
        $location.path('/denied');
      });

    }

    
    
  });

  app.controller('CommentsController',function ($scope,$window,$location,$q,Comments) {
    $scope.test = "comment controller";

    $scope.comments = null;

    $scope.initFunc = function(){
      $scope.passport = {};
      $scope.passport.token = $window.localStorage.getItem('token');

      Comments.retrieveComments($scope.passport).success(function(data){
          $scope.comments = data;
        });

    }

    $scope.postComment = function(){

      Comments.postComment($scope.comment).success(function(){
        $scope.initFunc();
      });

    }

    $scope.signOut = function(){
      $window.localStorage.removeItem('token');
      $location.path('/signin');
    }
    
  });



  /*<<<<<<<<<<<<<<<<<<<<<<ROUTING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


  app.config(['$routeProvider',function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'AuthController',
      })
      .when('/comments', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsController',
      })
      .when('/denied', {
        templateUrl: '404.html',
        controller: 'CommentsController',
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

