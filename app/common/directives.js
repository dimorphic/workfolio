(function(angular){
  "use strict";

    //
    // Directives
    //
	var appDirectives = angular.module('workfolio.directives', []);

    //
    // App Logo
    //
    appDirectives.directive("appLogo", function($timeout) {
        var tpl = 'templates/directives/app-logo.tpl.html';

        // Link to DOM
        var link = function(scope, element, attrs) {

            var timings = [0, 200, 400, 600, 800, 1000];

            // TODO: finish logo stroke self-draw ?
            /*
            var $paths = element.find('path');

            $paths.each(function(i) {

                var $path, pathLen, pathRect;

                $path = $(this);
                pathLen = this.getTotalLength();
                pathRect = this.getBoundingClientRect();

                console.log("$path : ", $path);
                console.log("path len : ", pathLen);
                console.log("rect : ", pathRect);

                $path.css({
                   "stroke-dasharray": "" + pathLen + " " + pathLen,
                   "stroke-dashoffset": pathLen,
                   "stroke-width": "5",
                   "stroke": $path.css("fill"),
                   "fill": "transparent"
                });

                var $test = $path.css("stroke");

                return $path.css({
                   "transition": "stroke-dashoffset 3s ease " + timings[i] + "ms, fill 1s ease-in " +
                       (1500 + timings[i]) + "ms, stroke-width 1s ease " + (4500 + timings[i]),
                   "fill": $path.css("stroke"),
                   "stroke-dashoffset": "0"
                });

            });
            */


            //console.log($paths);

        };

        // Return directive config
        return {
            restrict: "E",
            templateUrl: tpl,
            link: link
        };
    });

    //
    // Loading SVG icon
    //
    appDirectives.directive("loadIcon", function($timeout) {
        var tpl = 'templates/directives/load-icon.tpl.html';

        // Link to DOM
        var link = function(scope, element, attrs) { };

        // Return directive config
        return {
            restrict: "E",
            templateUrl: tpl,
            link: link
        };
    });

    //
    // Grid
    //

    // grid item
    appDirectives.directive("gridItem", function($timeout) {
        var tpl = 'templates/directives/grid.item.tpl.html';

        // Animate each box
        var fadeDirections = [ "Up", "Down", "Left", "Right" ];

        // Link to DOM
        var link = function(scope, element, attrs) {
            // do nothing if no model
            if(!scope.project) {
                console.warn('No project scope set! returning...');
                return;
            }

            // continue, do stuffz!
            var $item = element.find(".grid-item");
            var $thumb = element.find(".thumb");
            var $img = $thumb.find("img");

            var src = scope.project.thumbUrl;

            var fxClass = _.sample(fadeDirections, 1);
            //var delay = element.index() * 0.1 + 's';

            var handleClick = function (e) {
                console.log('clicky! @ ', scope.project);
                /*e.preventDefault();



                ngDialog.open({
                    template: 'templates/partials/lightbox.tpl.html',
                    className: 'ngdialog-theme-flat',
                    //scope: scope
                    controller: ['$scope', function($scope) {
                        // logic here bro
                        $scope.project = scope.project;
                    }]
                });*/
            };

            // bind once
            $img.one("load", function() {
                //console.log("project: ", scope.project);
                //console.log("projects: ", scope.projects);
                //console.log("rdy bind load!", src);

                // set background image
                $thumb.css("background-image", 'url(' + src + ')');

                // fade item in
                $thumb.addClass("animated fadeIn" + fxClass);

                // set item to 'loaded' state
                $item.addClass("loaded");

                // add click event
                element.on("click", handleClick);
            });

        };

        // Return directive config
        return {
            restrict: "E",
            // create scope alias to model
            /*scope: {
            	project: '=project'
            },*/
            templateUrl: tpl,
            link: link
        };
    });

    //
    //  Swipebox directive
    //
    appDirectives.directive("lightBox", function($compile, $http, $timeout) {
        var tpl = 'templates/partials/lightbox.tpl.html';

        // DOM link
        var link = function(scope, element, attrs) {
            // group tag
            if (attrs.lightBox) {
                element.attr('rel', attrs.lightBox);
            }

            var $img = element.find("img");

            // bind once
            $img.one("load", function() {
                console.log("lighbox img loaded bro!");

                // get template
                /*

                $http.get(tpl).then(function(response) {
                   if(response.status === 200) {
                       var template = angular.element(response.data);
                       var compiledTemplate = $compile(template);
                       compiledTemplate(scope);


                       // bind click event
                       $(element).on("click", function() {
                           $.fancybox.open({ content: template, type: 'html'});

                           $timeout(function() {
                               $.fancybox.close();
                           }, 2000);
                       });
                   }
                });
                */

                var $project = {
                    href: scope.project.thumbUrl,
                    title: scope.project.name
                };
/*
                $http.get(tpl).then(function(response) {
                    if(response.status === 200) {
                        var template = angular.element(response.data);
                        var compiledTemplate = $compile(template)(scope);


                    }
                });
*/

                // bind click event
                $(element).on("click", function() {
                    $.fancybox($project, { padding: 0, openEffect: 'elastic' });
                    //$.fancybox.open({ href: template, type: 'html' });

                });



            });

            /*$(element).fancybox({

            });*/

        };

        // Return directive config
        return {
            restrict: "A",
            link: link
        };
    });


    //
    //  Experimental: 3d tilter
    //
    appDirectives.directive("3dTilter", function($rootScope, $timeout, $M) {
        // Link to DOM
        var link = function(scope, element, attrs) {

            //element.addClass("3d-tilter");

            // click event
            /*element.on("click", function() {
                console.log("tilter click");
            });*/

            // mouse move / tilt
            element.on("mousemove", function(e) {
                var x, y;

                x = ( e.pageX - element.offset().left - ( element.outerWidth(true) / 2 ) ) * -1 / 9;
                y = ( e.pageY - element.offset().top - ( element.outerHeight(true) / 2 ) ) * -1 / 9;

                // simplify numbers for our matrix
                x /= 15;
                y /= 15;

                // sylvester matrix
                var tM = $M([
                    [1, 0, 0, -x*1E-4],
                    [0, 1, 0, -y*1E-4],
                    [0, 0, 1, 1],
                    [0, 0, 0, 1]
                ]);

                // matrix position
                var pos = "matrix3d(";

                pos += tM.e(1,1).toFixed(10) + "," + tM.e(1,2).toFixed(10) + "," + tM.e(1,3).toFixed(10) + "," + tM.e(1,4).toFixed(10) + ",";
                pos += tM.e(2,1).toFixed(10) + "," + tM.e(2,2).toFixed(10) + "," + tM.e(2,3).toFixed(10) + "," + tM.e(2,4).toFixed(10) + ",";
                pos += tM.e(3,1).toFixed(10) + "," + tM.e(3,2).toFixed(10) + "," + tM.e(3,3).toFixed(10) + "," + tM.e(3,4).toFixed(10) + ",";
                pos += tM.e(4,1).toFixed(10) + "," + tM.e(4,2).toFixed(10) + "," + tM.e(4,3).toFixed(10) + "," + tM.e(4,4).toFixed(10);

                pos += ")";

                // set 3d tilt shift
                element.css("transform", pos);
            });


        };

        // Return directive config
        return {
            restrict: "AC",
            link: link
        };
    });


// end directives
})(angular);