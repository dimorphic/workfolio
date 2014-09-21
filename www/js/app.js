(function(angular){

  "use strict";

    //
    // Dependencies
    //
    var dependencyModules = [
        'Console', 'underscore',
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',

        'angular-loading-bar',
        'ngMorph'
    ];

    var appComponents = [
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
        [        '$rootScope', '$log',
        function ($rootScope,   $log) {
            
            // Helpers utils
            $rootScope.$log = $log;

            $rootScope.$wtf = "da fak bro app.js init";
        }
    ]);  

// end
})(angular);