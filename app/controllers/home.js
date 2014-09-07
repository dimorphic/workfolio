(function (angular) {
    "use strict";

    //
    // Home controllers
    //
    var appControllers = angular.module('demo.ctrls.home', []);

    var HomeController = function($scope) {
        // ---------------
        // PRIVATE METHODS
        // ---------------
        var $state = $scope.$state;

        // ---------------
        // PUBLIC METHODS
        // ---------------
        $scope.debug = "da fak controller bro";

        // controlz test
        $scope.singleModel = 1;

        $scope.radioModel = 'All';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };


        // all, apps, branding, banners
        $scope.filters = [ "all", "apps", "branding", "banners" ];


        //
        // Projects
        //
        $scope.projects = [
            {
                name: "Heineken",
                thumb: "./assets/images/img-01.jpg"
            },
            {
                name: "We Come One",
                thumb: "./assets/images/img-02.jpg"
            },
            {
                name: "Scorpiones",
                thumb: "./assets/images/img-03.jpg"
            },
            {
                name: "Panthera",
                thumb: "./assets/images/img-04.jpg"
            },
            {
                name: "Vocea Romaniei",
                thumb: "./assets/images/img-05.jpg"
            },
            {
                name: "They See me Rollin'",
                thumb: "./assets/images/img-06.jpg"
            },
            {
                name: "Real Steel",
                thumb: "./assets/images/img-07.jpg"
            },
            {
                name: "X marks the spot",
                thumb: "./assets/images/img-08.jpg"
            }

        ];

    };


    //
    // Set controller
    //

    // Home
    appControllers.controller(
        "homeController",
        [
            '$scope',
            HomeController
        ]
    );

})(angular);