(function(){

  "use strict";

    //
    // Dependencies
    //
    var dependencyModules = [
        'underscore', 'sylvester',
        'ionic', 'ngCordova',
        'ui.router', 'ui.showhide', 'ngAnimate', 'ngTransiterate',
        'angularLocalStorage', 'firebase',
        'Console'
    ];

    var appComponents = [
        'tapIt.config',
        'tapIt.controllers',
        'tapIt.directives',
        'tapIt.filters',
        'tapIt.routes',
        'tapIt.services'
    ];

  	//
	// App
	//

    // Declare app level module which depends on filters, and services
	var tapItApp = angular.module('tapIt', dependencyModules.concat(appComponents));

    // to do: cleanup?
    tapItApp.config(function ($logProvider) {
        // uncomment to enable dev logging in the app
        // $logProvider.debugEnabled(false); // not working atm for some reason ??!
    })

    
    //
    // Root Scope and UTILS
    //
    .run(
        [        '$rootScope', '$log', 'GENERAL_CONFIG', 'DEV_CONFIG', 'GAME_CONFIG',
        function ($rootScope,   $log, GENERAL_CONFIG, DEV_CONFIG, GAME_CONFIG) {
            
            // Helpers utils
            $rootScope.$log = $log;

            // Common constants
            $rootScope.DEVMODE = DEV_CONFIG.debugEnabled;
            $rootScope.FBURL = GENERAL_CONFIG.FBURL;

            // Game settings
            $rootScope.gameConfig = {
                // Config constants
                MAXPLAYERS: GAME_CONFIG.MAXPLAYERS, // max players per game room
                DEATH_HP: GAME_CONFIG.DEATH_HP   // player death percent ratio
            };

            // Stats
            $rootScope.gameStats = {
                gameOver: null,
                win: null,

                apm: 0,
                lastTap: null
            };


            // Background color animation rotator
            $rootScope.showBgColorAnim = true;

            // to do
            //$rootScope.auth = loginService.init('/login');
        }
    ]);  

// end
})();