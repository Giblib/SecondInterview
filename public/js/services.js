angular.module('giblib.services', []).factory('Comments', ['$http', 'API', function($http, API) {
  return {
    get : function() {
      return $http.get(API + '/comments');
    },
		
    create : function(commentData) {
      return $http.post(API + '/comments', commentData);
    }
  }       
}]);