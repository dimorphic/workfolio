(function (angular) {
    "use strict";

    //
    // Home controllers
    //
    var appControllers = angular.module('workfolio.ctrls.home', []);

    var HomeController = function($scope, $rootScope, ProjectService) {
        // ---------------
        // PRIVATE METHODS
        // ---------------
        var $state = $scope.$state;

        // ---------------
        // PUBLIC METHODS
        // ---------------

        //
        // Projects
        //
        ProjectService.init().then(function(data) {
           // console.log("data here boy!!! : ", data);
            $scope.projects = data;

            //console.log($scope.projects);
            /*angular.forEach(data, function(value, index) {
                console.log('data bro @ ', value);
            });*/
        });

        // menu
        $scope.mainMenu = [ "all", "app", "branding", "banner" ];

        $scope.contact = {
            closeEl: '.close',
            overlay: {
                templateUrl: 'templates/partials/contact.tpl.html'
            }
        };

        // filters
        $scope.radioModel = 'all';
        $scope.predicate = "-year";

        $scope.filterQuery = null;
        $scope.setFilter = function(filter) {
            $scope.filterQuery = filter;
        };

        // watch for changes
        $scope.$watch("radioModel", function(newValue, oldValue) {
            console.log("menu filter has changed : ", oldValue, " -> ", newValue);

            if(newValue === "all") {
                $scope.setFilter("");
            } else {
                $scope.setFilter(newValue);
            }
        });

    };

    //
    // Set controller
    //

    // Home
    appControllers.controller(
        "homeController",
        [
            '$scope',
            '$rootScope',
            'ProjectService',

            //'$ocModal',
            //'ngDialog',
            HomeController
        ]
    );

})(angular);