(function() {
'use strict';

angular.module('myapp')
  .factory('Todo', Todo);

  Todo.$inject = ['$resource'];

  function Todo($resource) {
    var TodoResource = $resource('api/v1/comments',{},{});
    return TodoResource;
  }

})();
