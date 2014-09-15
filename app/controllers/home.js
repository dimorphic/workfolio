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
        $scope.debug = "da fak controller bro";

        // controlz test
        $scope.singleModel = 1;
        $scope.radioModel = 'all';
        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };


        $scope.imgUrl = "http://nyx.athma.net/pix/_scraps_2010_Static.jpg";

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


        // menu filters
        $scope.filters = [ "all", "apps", "branding", "banners" ];

        // testing
        // swipe / lightbox config
        $scope.lightboxSettings = {
            useCSS : true, // false will force the use of jQuery for animations
            initialIndexOnArray: 0, // which image index to init when a array is passed
            hideBarsOnMobile : true, // false will show the caption and navbar on mobile devices
            hideBarsDelay : 0, // 0 to always show caption and action bar
            videoMaxWidth : 1140, // videos max width
            beforeOpen: function(){
                console.log('before open lightbox');
            } , // called before opening
            afterClose: function(){
                console.log('wtf close lightbox');
            }, // called after closing
            loopAtEnd: false // true will return to the first image after the last image is reached
        };

        //
        // Projects
        //
//        $scope.projects = [
//            {
//                name: "Heineken",
//                thumb: "./assets/images/img-01.jpg"
//            }
//        ];

        //$scope.projects = ProjectService.getAvailable();

        ProjectService.init().then(function(data) {
           // console.log("data here boy!!! : ", data);


            $scope.projects = data;

            angular.forEach(data, function(value, index) {
              // console.log('data bro @ ', value);



            });
        });


        $scope.categoryFilter = null;
        $scope.setCategoryFilter = function(category) {
            $scope.categoryFilter = category;
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