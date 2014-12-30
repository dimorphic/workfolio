(function (angular) {
    "use strict";

    //
    // Home controllers
    //
    var appControllers = angular.module('workfolio.ctrls.home', []);

    var HomeController = function($scope, $timeout, ProjectsService) {
        // ---------------
        // PRIVATE METHODS
        // ---------------
        var $state = $scope.$state;
        var itemsToAdd = 4;

        // ---------------
        // PUBLIC METHODS
        // ---------------

        //
        // Projects
        //
        $scope.projects = [];

        $scope.loadMore = null; // infinite scroll trigger/caller
        $scope.infiniteDisabled = true; // infinite status flag
        $scope.showHintMore = !$scope.infiniteDisabled; // got more ?

        // add project
        var _addProject = function(item) {
            // TODO: check if item is in list already ?
            // TODO: ... maybe fixes random ng-dupe bug ? yes plx ?
            var check = _.find($scope.projects, item);
            if (check) { return; }

            //$timeout(function() {
                $scope.projects.push(item);
            //});
        };

        // init bro
        // TODO: clean up + move code to service ?
        ProjectsService.init().then(function(data) {

            // data is here bro!
            $scope.projectsData = data;

            // load more function
            $scope.loadMore = function() {
                $timeout(function() {
                    // how many items to add when we reach bottom
                    var remaining = $scope.projectsData.length - $scope.projects.length;

                    if (remaining) {
                        $scope.showHintMore = true;

                        var last = $scope.projects.length;
                        var items = (remaining < itemsToAdd) ? remaining : itemsToAdd;

                        for (var i = last; i < last + items; i++) {
                            _addProject($scope.projectsData[i]);
                        }

                    } else {
                        // disable infinite scroll
                        $scope.infiniteDisabled = true;
                        $scope.showHintMore = !$scope.infiniteDisabled;
                    }
                });
            };

            // enable infinite scroll
            $scope.infiniteDisabled = false;

            // disable noscroll directive
            $timeout(function() {
                $scope.$emit("noScroll:disable");
            }, 4000);

        });


        //
        // Menu
        // TODO: rewrite as module
        //
        $scope.mainMenu = [ "all", "app", "branding", "other", "wallpaper" ]; // menu sorters
        $scope.menuModel = 'all'; // curent selected/active menu item

        // order by
        // TODO: remove this ?
        $scope.predicate = "-year"; // orderBy
        $scope.reverse = false;

        // filters
        $scope.filterQuery = null;
        $scope.setFilter = function(filter) {
            $scope.filterQuery = filter;
        };

        // watch for changes on menu
        $scope.$watch("menuModel", function(newValue, oldValue) {
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
            '$timeout',
            'ProjectsService',

            HomeController
        ]
    );

})(angular);