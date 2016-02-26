(function() {
    'use strict';

    angular.module('myApp')
        .controller('CommentCtrl',['$location', '$http', CommentCtrl]); //.controller close
           
 function CommentCtrl($location, $http) {
   var vm = this;
    //check if user is logged in localStorage.
    if(!localStorage.isLoggedIn){
      $location.path('login'); //if NOT return them to Login state..
      return;
    }
  
  //later create am 404.html: Error handler
   vm.sendComment = function(){ //if not logged in.. you can't send comment.. 
       $http.post('http://localhost:8080/api/v1', {//check API URL
        // comment: 'text'
        text: vm.text

       });
       console.log("Comment Posted..");
   };
 }
 
 
 
})(); //IIFE END

