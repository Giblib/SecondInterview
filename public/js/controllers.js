'use strict';

angular.module('giblib.controllers', [])
	.controller('AppCtrl', function($scope, $window, auth) {
		$scope.logout = function() {
			auth.logout && auth.logout();
			$window.location.href = '/';
		};
		
		$scope.isAuthed = function() {
			return auth.isAuthed ? auth.isAuthed() : false;
		};
	})
	.controller('MainCtrl', function($scope, user, auth) {	
		$scope.main = {};
			
		function handleRequest(res) {
    	var token = res.data ? res.data.token : null;
    	if(token) { console.log('JWT:', token); }
    	self.message = res.data.message;
  	}	

		$scope.main.login = function() {
    	user.login($scope.main.username, $scope.main.password)
      	.then(handleRequest, handleRequest)
  	};
	
	  $scope.main.isAuthed = function() {
	    return auth.isAuthed ? auth.isAuthed() : false;
	  };
	})
	.controller('CommentsCtrl', function($scope, $window, $timeout, initData, Comments) {
	
		$scope.data = {
			isAuthed: false, 
			comments: null
		}
		
		var init = function() {
			// Normally this would be handled at the core level with a responseExtractor.
			if (!initData.isAuthed) {
				$window.location.href = '/';
			} else {
				$scope.data.comments = initData.comments.data;	
			}
		};
		
		$scope.addComment = function() {
			var commentData = {
				text: $scope.data.newComment
			}
			
			Comments.create(commentData)
				.then(function() {
					$scope.data.showSuccess = true;
					$scope.data.newComment = '';
					
					Comments.get()
						.then(function(result) {
							$scope.data.comments = result.data;
						});
					
					$timeout(function() {
						$scope.data.showSuccess = false;
					}, 5000);
				});
		};
		
		init();
	});