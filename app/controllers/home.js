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

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };

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