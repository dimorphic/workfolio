(function (angular) {

    "use strict";

    angular.module('tapIt.routes', [])

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
                var home,
                    room, roomList, roomNew, roomId,
                    searchRadar;

                // Home
                home = {
                    name: 'home',
                    url: '/',
                    templateUrl: 'partials/home.tpl.html',
                    controller: 'homeController'
                };

                // Search Radar
                searchRadar = {
                    name: 'radar',
                    url: '^/radar',
                    templateUrl: 'partials/search.radar.tpl.html',
                    controller: 'searchRadarController'
                };

                // Room
                room = {
                    abstract: true,
                    name: 'rooms',
                    url: '/rooms',
                    // templateUrl: 'partials/game.tpl.html',
                    template: '<ui-view/>',
                    controller: function($scope) {}
                };

                roomList = {
                    name: 'rooms.list',
                    url: '/list',
                    templateUrl: 'partials/rooms.list.tpl.html',
                    controller: 'roomListController'
                };

                roomNew = {
                    name: 'rooms.new',
                    url: '/new',
                    templateUrl: 'partials/rooms.new.tpl.html',
                    controller: 'roomNewController'
                };

                // roomId = {
                //     name: 'rooms.id',
                //     url: '^/room/{id}',
                //     templateUrl: 'partials/room.tpl.html',
                //     controller: function($scope) {
                //         $scope.debug = $scope.$stateParams;
                //     }
                // };

                // Game
                var game, gameColorPicker,
                    gameRoom, gamePlayer;

                game = {
                    abstract: true,
                    name: 'game',
                    url: '/game',
                    template: '<ui-view/>',
                    controller: 'gameController'
                };

                gamePlayer = {
                    name: 'game.player',
                    url: '/player',
                    templateUrl: 'partials/game.player.tpl.html',
                    controller: 'gamePlayerController'
                };
            
                // gameColorPicker = {
                //     name: 'picker',
                //     url: '^/room/{id:[0-9A-z]{8}-[0-9A-z]{4}-[0-9A-z]{4}-[0-9A-z]{4}-[0-9A-z]{12}}/picker',
                //     templateUrl: 'partials/game.picker.tpl.html',
                //     controller: 'gameColorPickerController'
                // };

                gameRoom = {
                    name: 'game.room',
                    url: '^/room/{id:[0-9A-z]{8}-[0-9A-z]{4}-[0-9A-z]{4}-[0-9A-z]{4}-[0-9A-z]{12}}',
                    templateUrl: 'partials/game.room.tpl.html',
                    controller: 'gameRoomController',
                    resolve: {
                        getGame: function($stateParams, GameRoomService) {
                            // TODO: enable route resolve promise
                            // return GameRoomService.loadGame($stateParams.id);
                        }
                    }
                };

                // Set states
                $stateProvider

                    // Home
                    .state(home)

                    // Search (to do)
                    //.state(searchRadar)

                    // Room
                    .state(room)
                    .state(roomList)
                    .state(roomNew)
                    //.state(roomId)

                    // Game
                    .state(game)
                    .state(gamePlayer)
                    //.state(gameColorPicker)
                    .state(gameRoom);

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