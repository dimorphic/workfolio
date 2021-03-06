(function(angular){

  "use strict";

    //
    // Dependencies
    //
    var dependencyModules = [
        'Console',
        'underscore',

        'ngTouch',
        'ngAnimate',
        'ui.router',

        'ui.bootstrap',
        'ui.showhide',

        'angular-loading-bar',
        'infinite-scroll'
    ];

    var appComponents = [
        'workfolio.config',
        'workfolio.directives',
        'workfolio.controllers',
        'workfolio.routes',
        'workfolio.services'
    ];

    //
    // App
    //

    // Declare app level module which depends on filters, and services
	var mainApp = angular.module('workfolio', dependencyModules.concat(appComponents));

    //
    // Root Scope and UTILS
    //
    mainApp.run(
        [        '$rootScope', '$log', '$window',
        function ($rootScope,   $log, $window) {
            
            // Helpers utils
            $rootScope.$log = $log;
            //$rootScope.Modernizr = $window.Modernizr;

            // $window.FastClick.attach(document.body);
        }
    ]);  

// end
})(angular);