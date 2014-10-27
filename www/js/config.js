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
			'DBURL': 'https://spreadsheets.google.com/feeds/list/1BVPdAa0j09ZdP_3u1AhId941gUpKcngBMliDL7GYnGA/od6/public/values?alt=json-in-script' + '&callback=JSON_CALLBACK' // google docs as db
		},

		// Development settings
		'DEV_CONFIG': {
			'debugEnabled': 'true' // set debug mode true to see log outputs (to do: via $logProvider)
		}
	};

	// set constants
	appConfig.constant(configData);

	// Decorate $log provider
	appConfig.config(['$logProvider', function ($logProvider) {

		if(configData['DEV_CONFIG'].debugEnabled) {
			// uncomment to enable dev logging in the app
			$logProvider.debugEnabled(true); // todo: finish
		}

	}]);

// end
})(angular);