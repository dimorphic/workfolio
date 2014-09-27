(function(angular){
  "use strict";

    //
    // Services
    //
    var sylvester = angular.module('sylvester', []);

    //
    //  Sylvester provider
    //

    // Vector
    sylvester.factory('$V', function() {
      return window.$V; // assumes sylvester has already been loaded on the page
    });

    // Matrix
    sylvester.factory('$M', function() {
        return window.$M; // assumes sylvester has already been loaded on the page
    });

    // Line
    sylvester.factory('$L', function() {
        return window.$L; // assumes sylvester has already been loaded on the page
    });

    // Plane
    sylvester.factory('$P', function() {
        return window.$P; // assumes sylvester has already been loaded on the page
    });


// end
})(angular);