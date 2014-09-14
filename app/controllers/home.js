(function (angular) {
    "use strict";

    //
    // Home controllers
    //
    var appControllers = angular.module('workfolio.ctrls.home', []);

    var HomeController = function($scope, $ocModal) {
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


        $scope.imgUrl = "http://nyx.athma.net/pix/_scraps_2010_Static.jpg";


        $scope.settings1 = {
            closeEl: '.close',
            overlay: {
                templateUrl: 'templates/partials/lightbox.tpl.html',
                scope: {
                    imgUrl: "http://nyx.athma.net/pix/_scraps_2010_Static.jpg",
                    debug: "lolz bro"
                }
            }


        };


        $scope.displayImage = function(img) {
            //console.log('img obj: ', img);


            $ocModal.open({
                //url: 'templates/partials/lightbox.tpl.html',
                template: "wtf bro modal",
                cls: 'animated fadeInDown',
                onOpen: function() {
                    console.log('modal opened');
                },
                onClose: function() {
                    console.log('modal closed');
                },
                init: {
                    debug: "init val bro"
                }
            });
        };



















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
            },

            // -------------------

            {
                name: "test-01",
                thumb: "http://nyx.athma.net/pix/_scraps_2010_Static.jpg"
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
            '$ocModal',
            HomeController
        ]
    );

})(angular);