'use strict';

angular.module('giblib').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {		
	//$httpProvider.interceptors.push('AuthInterceptor');
	
	$routeProvider
    .when('/', {
      templateUrl: 'views/main.view.html',
      controller: 'MainCtrl'
    })
    .when('/comments', {
      templateUrl: 'views/comments.view.html',
      controller: 'CommentsCtrl',
			resolve: {
				initData: function($q, auth, Comments){
	        var isAuthed = auth.isAuthed();
	        var getComments = Comments.get();

	        return $q.all([isAuthed, getComments]).then(function(results){
            return {
              isAuthed: results[0],
              comments: results[1]
            };
	        });
        }
			}
    })
		.otherwise({ redirectTo: '/' });;
	}
]);
