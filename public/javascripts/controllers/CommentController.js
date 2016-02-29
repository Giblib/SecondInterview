(function() {
  'use strict';

  angular.module('myApp')
    .controller('CommentCtrl', CommentCtrl);

  function CommentCtrl($http) {
    var vm = this;

    vm.comments = [];

    //for comments ng-if function 
    if (localStorage.isLoggedIn) {
      vm.userIsLoggedIn = true;
    }

    getComments();

    function getComments() {
      $http.get('http://localhost:8080/api/v1/comments')
        .success(function(postedComments) {
          vm.comments = postedComments;
        }).error(function(error) {
          console.log('An error has occurred');
          console.log(error);
        });
    }

    vm.sendComment = function() {
      $http.post('http://localhost:8080/api/v1/comments', {
        text: vm.text
      }).success(function() {
        vm.comments.push({
          text: vm.text
        });
        vm.text = '';
        console.log("Comment Posted..");
      }).error(function(error) {
        console.log(error);
      });

    };
  }
})(); //IIFE END