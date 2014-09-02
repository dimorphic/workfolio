(function(angular){

  "use strict";

    //
    // Dependencies
    //
    var dependencyModules = [
        'Console',
        'underscore',
        'ui.router'
    ];

    var appComponents = [
        'demo.directives',
        'demo.controllers',
        'demo.routes'
    ];

  	//
	// App
	//

    // Declare app level module which depends on filters, and services
	var mainApp = angular.module('demo', dependencyModules.concat(appComponents));

    //
    // Root Scope and UTILS
    //
    mainApp.run(
        [        '$rootScope', '$log',
        function ($rootScope,   $log) {
            
            // Helpers utils
            $rootScope.$log = $log;


        }
    ]);  

// end
})(angular);