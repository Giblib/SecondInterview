	
function authInterceptor(API, auth) {
  return {
    request: function(config) {
			var token = auth.getToken();
		  
			if(config.url.indexOf(API) === 0 && token) {
		    config.headers.Authorization = 'Bearer ' + token;
		  }
		  return config;
    },

    response: function(res) {
			if(res.config.url.indexOf(API) === 0 && res.data.token) {
		    auth.saveToken(res.data.token);
		  }
			
		  return res;
    },
  }
}

function authService($window) {
  var self = this;
	
	self.isAuthed = function() {
	  var token = self.getToken();
	  if(token) {
	    var params = self.parseJwt(token);
	    return Math.round(new Date().getTime() / 1000) <= params.exp;
	  } else {
	    return false;
	  }
	}

	self.parseJwt = function(token) {
	  var base64Url = token.split('.')[1];
	  var base64 = base64Url.replace('-', '+').replace('_', '/');
	  return JSON.parse($window.atob(base64));
	}
	
	self.saveToken = function(token) {
  	$window.localStorage['jwtToken'] = token;
	}
	
	self.getToken = function() {
  	return $window.localStorage['jwtToken'];
	}	
	
	self.logout = function() {
		$window.localStorage.removeItem('jwtToken');
	}
}

function userService($http, API, auth) {
  var self = this;
  
	self.login = function(username, password) {
		return $http.post(API + '/authenticate', {
			username: username,
			password: password
		});
	};
}

angular.module('giblib', ['ngRoute', 'giblib.controllers', 'giblib.services'])
	.factory('authInterceptor', authInterceptor)
	.service('user', userService)
	.service('auth', authService)
	.constant('API', '/api/v1')
	.config(function($httpProvider) {
	  $httpProvider.interceptors.push('authInterceptor');
	});