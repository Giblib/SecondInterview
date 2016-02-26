  angular.module('myapp').controller('UICtrl', function ($scope, $uibModal, $log, $window) {


    /*
      CAROUSEL IMPLMENTATION
    */
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
      var newWidth = $window.innerWidth + slides.length + 1;
      slides.push({
        image: 'http://lorempixel.com/' + newWidth + '/' + $window.innerHeight,
        text: 'View for non-authenticated user',
        id: currIndex++
      });
    };

    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 10; i++) {
      $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
      for (var i = 0, l = slides.length; i < l; i++) {
        slides[i].id = indexes.pop();
      }
    }

    function generateIndexesArray() {
      var indexes = [];
      for (var i = 0; i < currIndex; ++i) {
        indexes[i] = i;
      }
      return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;

      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }

      return array;
    }
  });
