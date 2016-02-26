(function() {
    'use strict';

    angular.module('myApp')
        .controller('CommentCtrl',['$location', '$http', CommentCtrl]); //.controller close
           
 function CommentCtrl($location, $http) {
   var vm = this;

   vm.comments = [];

   getComments();

   function getComments(){
    $http.get('http://localhost:8080/api/v1/comments')
    .success(function(postedComments){
      vm.comments = postedComments;
    }).error(function( error){
      console.log('An error has occurred');
      console.log(error);
    });
   }
    //check if user is logged in localStorage.
    if(!localStorage.isLoggedIn){
      $location.path('login'); //if NOT return them to Login state..
      return;
    }

   vm.sendComment = function(){ //if not logged in.. you can't send comment.. 
       $http.post('http://localhost:8080/api/v1/comments', {//check API URL
        // comment: 'text'
        text: vm.text
       }).success(function(){
        vm.comments.push({
          text: vm.text
        });
       console.log("Comment Posted..");
       }).error(function(error){
        console.log(error);
       });
   };
 }
 
 
 
})(); //IIFE END
