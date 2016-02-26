// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

(function() {
'use strict';

  angular.module('myapp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $log, user) {

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.submit = function (user) {
                    $uibModalInstance.close(user);
                };
  }); //ModalInstanceCtrl

})(); //iife
