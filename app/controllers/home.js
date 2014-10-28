(function (angular) {
    "use strict";

    //
    // Home controllers
    //
    var appControllers = angular.module('workfolio.ctrls.home', []);

    var HomeController = function($scope, $timeout, ProjectService) {
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
        $scope.projects = [];

        $scope.loadMore = null;
        $scope.infiniteDisabled = true;
        $scope.showHintMore = !$scope.infiniteDisabled;

        // promise!
        ProjectService.init().then(function(data) {

            // data is here bro!
            $scope.projectsData = data;

            // load more function
            $scope.loadMore = function() {

                var addProject = function(item) {
                    //console.log(item);

                    $timeout(function() {
                        $scope.projects.push(item);
                    });
                };

                // how many items to add when we reach bottom
                var itemsToAdd = 4;
                var remaining = $scope.projectsData.length - $scope.projects.length;

                if(remaining) {
                    $scope.showHintMore = true;

                    var last = $scope.projects.length;
                    var items = (remaining < itemsToAdd) ? remaining : itemsToAdd;

                    for(var i = last; i < last+items; i++) {
                        addProject($scope.projectsData[i]);
                    }

                } else {
                    // console.log('no more items to add');

                    // disable infinite scroll
                    $scope.infiniteDisabled = true;
                    $scope.showHintMore = !$scope.infiniteDisabled;
                }

            };

            // enable infinite scroll
            $scope.infiniteDisabled = false;

            // disable noscroll directive
            $timeout(function() {
                $scope.$emit("noScroll:disable");
            }, 4000);

        });


        // menu
        $scope.mainMenu = [ "all", "app", "branding", "banner" ]; // menu sorters
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
            // console.log("menu filter has changed : ", oldValue, " -> ", newValue);
            //alert('da fak @ ' + $scope.menuModel);

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
            'ProjectService',

            HomeController
        ]
    );

})(angular);