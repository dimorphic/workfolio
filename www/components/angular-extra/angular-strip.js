(function(angular, Strip){
  "use strict";

    //
    // Services
    //
    var strip = angular.module('Strip', []);

    //
    //  Strip provider
    //
    strip.factory('Strip', function() {
        return window.Strip; // assumes underscore has already been loaded on the page
    });

// end
})(angular, Strip);