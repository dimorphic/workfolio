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