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
        ['$rootScope', '$window',
        function($rootScope, $window) {

            //
            // Define raF
            //
            var requestAnimationFrame = $window.requestAnimationFrame ||
                $window.mozRequestAnimationFrame ||
                $window.msRequestAnimationFrame ||
                $window.webkitRequestAnimationFrame;

            // expose
            return function(tick) {
                requestAnimationFrame(tick);

                /*requestAnimationFrame(function() {
                    $rootScope.$apply(tick);
                });*/
            };

        }
    ]);

// end
})(angular);