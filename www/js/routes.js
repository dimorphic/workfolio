(function (angular) {

    "use strict";

    angular.module('workfolio.routes', [])

        //
        // Prevent XSS attacks
        //
        .config(
            [        '$compileProvider',
            function ($compileProvider){            
                // URL protocols whitelist
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/); // Angular adds "unsafe" prefix by default on non-whitelisted URLs
            }
        ])

        //
        // Redirects + States
        //
        .config(
            [        '$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider,   $urlRouterProvider, $locationProvider) {
                //
                // Set up routes that our app will respond to
                //
                var home;

                // Home
                home = {
                    name: 'home',
                    url: '/',
                    templateUrl: 'templates/partials/home.tpl.html',
                    controller: 'homeController'
                };



                // Set states
                $stateProvider

                    // Home
                    .state(home);


                // Fallback route
                $urlRouterProvider.otherwise("/");

                // use the HTML5 History API
                // $locationProvider.html5Mode(true).hashPrefix('!');
            }
        ])

        // Add references to the $rootScope
        // so we can access them from any scope within the app
        .run(
            [        '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
    ]);

})(angular);