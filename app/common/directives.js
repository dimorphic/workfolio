(function(angular){
  "use strict";

    //
    // Directives
    //
	var appDirectives = angular.module('demo.directives', []);

    //
    // App Logo
    //
    appDirectives.directive("appLogo", function($timeout) {
        var tpl = 'templates/directives/app-logo.tpl.html';

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

        // Link to DOM
        var link = function(scope, element, attrs) {
            //if(!attrs.colors) { console.warn('No color attrs set! returning...'); return; } // do nothing if no model
            //if(!scope.colors) { console.warn('No color scope set! returning...'); return; } // do nothing if no model
            if(!scope.project) {
                console.warn('No project scope set! returning...');
                return;
            } // do nothing if no model

            //var index = element.parent().index();
            var box = element.find(".thumb");
            //var img = element.find(".thumb > img");
            var img = box.find("img");

            // bind once
            img.one("load", function() {

                var src = scope.project.thumb;

                box.css("background-image", 'url(' + src + ')');

                console.log("rdy bind load!", src);

            });

            // click event
            element.on("click", function() {
             //console.log('index hp:' + scope.project.name);
             console.log(box);
            });

            //console.log('here bro @ ');
            //console.log(element);

        };

        // Return directive config
        return {
            restrict: "E",
            // create scope alias to model
            scope: {
            	project: '=project'
            },
            templateUrl: tpl,
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