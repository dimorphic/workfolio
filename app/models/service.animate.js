(function (angular){
  "use strict";

    //
    //  workfolio.service.animate
    //

    var appService = angular.module('workfolio.service.animate', []);

    //
    //  Animate service
    //

    // TO DO: double check this?
    appService.factory('AnimateService',
        ['_', '$rootScope', '$window',
        function(_, $rootScope, $window) {

            //
            // Define raF
            //
            var requestAnimationFrame = $window.requestAnimationFrame ||
                $window.mozRequestAnimationFrame ||
                $window.msRequestAnimationFrame ||
                $window.webkitRequestAnimationFrame;

            // expose
            return function(tick) {
                requestAnimationFrame(function() {
                    $rootScope.$apply(tick);
                });
            };

        }
    ]);

// end
})(angular);