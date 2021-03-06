(function(angular, _){
  "use strict";

    //
    // Services
    //
    var underscore = angular.module('underscore', []);

    //
    //  Underscore provider
    //
    underscore.factory('_', ['$window',
      function($window) {
        return $window._; // assumes underscore has already been loaded on the page
      }
    ]);

// end
})(angular, _);