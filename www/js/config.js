(function (angular) {

	"use strict";

	//
	//	Config
	//
	var appConfig = angular.module('workfolio.config', []);

	// Define settings
	var configData = {

		// General config
		'GENERAL_CONFIG': {
			'APP_VERSION': '0.1', // version
			'FBURL': 'https://URL.firebaseio.com/' // end this with a trailing slash
		},

		// Development settings
		'DEV_CONFIG': {
			'debugEnabled': 'true' // set debug mode true to see log outputs (to do: via $logProvider)
		}
	};

	// set constants
	appConfig.constant(configData);

	// angular.forEach(configData, function(key,value) {
	//   appConfig.constant(value,key);
	// });

	// Decorate $log provider
	appConfig.config(['$logProvider', function ($logProvider) {

		if(configData['DEV_CONFIG'].debugEnabled) {
			// uncomment to enable dev logging in the app
			$logProvider.debugEnabled(true); // not working atm for some reason ??!

			//console.log("[DEV MODE] Debug logging ON");
		}

	}]);

})(angular);