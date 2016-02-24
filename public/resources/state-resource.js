(function() {
'use strict';

angular.module('app')
  .factory('State', State);

  State.$inject = ['$resource'];

  function State($resource) {
    var StateResource = $resource('/states/:abbreviation',{abbreviation: '@abbreviation'});
    return StateResource;


      //   return $resource('http://jsonplaceholder.typicode.com/todos/:id', {id: '@id'}, {
      // 'update': { method: 'PUT'},
      // 'forUser': {
      //   method: 'GET',
      //   url: 'http://jsonplaceholder.typicode.com/users/:userId/todos',
      //   isArray: true
      // }
  }

})();
