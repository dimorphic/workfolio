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
			'APP_VERSION': '1.0', // version
			// 'DBURL': 'https://spreadsheets.google.com/feeds/list/1BVPdAa0j09ZdP_3u1AhId941gUpKcngBMliDL7GYnGA/od6/public/values?alt=json-in-script' + '&callback=JSON_CALLBACK', // google docs as db
			'DBURL': 'https://opensheet.vercel.app/1BspNtXilNaTvik9Z5dTH9hymxSVj3VdbNW5WIAo11-M/Sheet1' // why Google why ?!
		},

		// Development settings
		'DEV_CONFIG': {
			'debugEnabled': 'true' // set debug mode true to see log outputs (to do: via $logProvider)
		},

        // Modernizr features
        'Modernizr': Modernizr
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