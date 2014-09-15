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

        // oc.modal test
        $scope.settings1 = {
            closeEl: '.close',
            overlay: {
                templateUrl: 'templates/partials/lightbox.tpl.html'
            }
        };

        $scope.displayImage = function(img) {
            console.log('img obj: ', img);

            /*$ocModal.open({
                url: "templates/partials/lightbox.tpl.html",

                cls: 'animated fadeInUp',
                onOpen: function() {
                    console.log('modal opened');
                },
                onClose: function() {
                    console.log('modal closed');
                },
                init: {
                    imgUrl: "http://nyx.athma.net/pix/_scraps_2010_Static.jpg"
                }
            });*/
        };

        // ngDialog test
        $scope.clickToOpen = function() {
            /*ngDialog.open({
                template: 'templates/partials/lightbox.tpl.html',
                className: 'ngdialog-theme-flat',
                scope: $scope
            });*/
        };

        $rootScope.$on('ngDialog.opened', function(e, $dialog) {
            console.log('ngdialog opened @' + $dialog.attr('id'));
        });


        //
        // Projects
        //
        ProjectService.init().then(function(data) {
           // console.log("data here boy!!! : ", data);
            $scope.projects = data;

            /*angular.forEach(data, function(value, index) {
                console.log('data bro @ ', value);
            });*/
        });

        // menu filters
        $scope.radioModel = 'all';
        $scope.filterMenu = [ "all", "apps", "branding", "banners" ];

        $scope.filterQuery = null;
        $scope.setFilter = function(filter) {
            $scope.filterQuery = filter;
        };

    };

    var LightboxController = function($scope, $rootScope, ProjectService) {
        console.log("lightbox CONTROLLER ON!");

        $scope.project = {
            title: "wtf"
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
            '$rootScope',
            'ProjectService',

            //'$ocModal',
            //'ngDialog',
            HomeController
        ]
    );

    // Lightbox
    appControllers.controller(
        "lightboxCtrl",
        [
            '$scope',
            '$rootScope',
            'ProjectService',

            LightboxController
        ]
    );

})(angular);