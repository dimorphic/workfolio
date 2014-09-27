(function(angular){
  "use strict";

    //
    // Directives
    //
	var appDirectives = angular.module('workfolio.directives', []);

    //
    // App Logo
    //
    appDirectives.directive("appLogo",
        ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            var tpl = 'templates/directives/app-logo.tpl.html';

            // Link to DOM
            var link = function(scope, element, attrs) {

                var timings = [0, 200, 400, 600, 800, 1000];

                // TODO: finish logo stroke self-draw ?
                var $paths = element.find('path');

                $paths.each(function(i) {
                    var $path, pathLen, pathRect;

                    $path = $(this);
                    pathLen = this.getTotalLength();

                    // console.log("$path : ", $path);
                    // console.log("path len : ", pathLen);

                    $path.css({
                       "stroke-dasharray": "" + pathLen + " " + pathLen,
                       "stroke-dashoffset": pathLen,
                       "stroke-width": "5",
                       "stroke": $path.css("fill"),
                       "fill": "transparent"
                    });

                    var $test = $path.css("stroke");

                    pathRect = this.getBoundingClientRect();
                    // console.log("rect : ", pathRect);

                    $path.css({
                       "transition": "stroke-dashoffset 3s ease " + timings[i] + "ms, fill 1s ease-in " +
                           (1500 + timings[i]) + "ms, stroke-width 1s ease " + (4500 + timings[i]),
                       "fill": $path.css("stroke"),
                       "stroke-dashoffset": "0"
                    });

                    // $test.css("stroke", "#f00");
                    // console.log('draw logo!', $test);

                });

                // circle anim
                var $circle = $(".st5");

                var circlePath = $circle[0].getTotalLength();
                //console.log("circle path @ ", circlePath);

                $circle.css({
                   // "stroke-dasharray": " 0 " + circlePath
                });

                $timeout(function() {

                    // circle
                    $circle.css({
                        "stroke": "#fff",
                        //"stroke-dasharray": "" + circlePath + " " + circlePath,
                        "stroke-dasharray": "0"
                        //"opacity": "1"
                    });

                    // crown
                    $(".st12").css({
                        "fill": "#fff"
                    });

                    // broadcast event to show fx.Stringz
                    $rootScope.$emit("fx.stringz:showCanvas");

                }, 3000);

                // console.log($paths);

            };

            // Return directive config
            return {
                restrict: "E",
                templateUrl: tpl,
                link: link
            };
        }
    ]);

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
                e.preventDefault();

                //console.log('clicky! @ ', scope.project);
                scope.$broadcast("lightBox:open");
            };

            // console.log("img loaded before: ", $img.complete);

            // bind once
            $img.one("load", function() {
                //console.log("rdy bind load!", src);

                $timeout(function() {
                    //console.log("running fx @ ", src);

                    // set background image
                    $thumb.css("background-image", 'url(' + src + ')');

                    // fade item in
                    $thumb.addClass("animated fadeIn" + fxClass);

                    // set item to 'loaded' state
                    $item.addClass("loaded");

                    // add click event
                    element.on("click", handleClick);

                }, 500);
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
                // console.log("lighbox img loaded bro!");

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

/*
                $http.get(tpl).then(function(response) {
                    if(response.status === 200) {
                        var template = angular.element(response.data);
                        var compiledTemplate = $compile(template)(scope);


                    }
                });
*/


                var $project = {
                    href: scope.project.thumbUrl,
                    title: scope.project.name
                };

                scope.$on('lightBox:open', function(data) {
                    //console.log("lightBox event @ ", $project);
                    $.fancybox($project, { padding: 0, openEffect: 'elastic' });
                });

            });

        };

        // Return directive config
        return {
            restrict: "A",
            link: link
        };
    });

    //
    //  Experimental: fxStringz
    //
    appDirectives.directive("fxStringz",
        ['$rootScope', '$window', '$timeout', 'AnimateService',
        function($rootScope, $window, $timeout, AnimateService) {
            // template
            var tpl = 'templates/directives/fx-stringz.tpl.html';
            //var tpl = '<canvas> </canvas>';

            // DOM link
            var link = function(scope, element, attrs) {
                // console.log("hello from stringz bro");

                /*var FpsMon = $window.FPSMeter;

                var meter = new FpsMon({
                    theme: 'dark',
                    heat: 1,

                    graph: 1,
                    history: 10,

                    left: 'auto',
                    right: 0
                });*/

                var active = true;

                var $element = $(element);

                // Canvas
                var canvas = $element.find("canvas")[0];
                var ctx = canvas.getContext("2d");
                var W, H = null;

                // Config
                var padding = 20;
                var count = 100;
                var distance = 100;

                // Resize handler
                scope.onResize = function() {
                    W = canvas.width = window.innerWidth;
                    H = canvas.height = window.innerHeight;

                    // console.log("on resize trigger bro!");
                };
                scope.onResize(); // ... and actually call it

                //
                // Point properties and behaviour
                //
                var Point = function() {
                    var self = this; // preserve 'this' for this.update

                    self.pos = {
                        x: Math.random() * ( W - padding * 2 ) + padding,
                        y: Math.random() * ( H - padding * 2 ) + padding,

                        update: function () {
                            if ( self.pos.x < padding || self.pos.x > W - padding ) { self.vel.x *= -1; }
                            if ( self.pos.y < padding || self.pos.y > H - padding ) { self.vel.y *= -1; }
                            self.pos.x += self.vel.x;
                            self.pos.y += self.vel.y;
                        }
                    };

                    self.vel = {
                        x: 2 * ( Math.random() < 0.5 ? -1 : 1 ),
                        y: 2 * ( Math.random() < 0.5 ? -1 : 1 )
                    };

                    self.setColor = {
                        r: Math.round( Math.random() * 255 ),
                        g: Math.round( Math.random() * 255 ),
                        b: Math.round( Math.random() * 255 )
                    };
                };

                //
                // Animation / loop / ticker
                //
                var animator = function(points, animate) {

                    (function tick() {

                        //console.log('tick! @ ', new Date().getTime());

                        // Paint canvas single color
                        ctx.fillStyle = "transparent";
                        ctx.clearRect(0, 0, W, H);
                        //  ctx.fillRect( 0, 0, W, H );

                        // Draw our strings
                        ctx.lineWidth = 1;

                        // Cycle over every point
                        angular.forEach(points, function(p) {
                        //points.forEach(function(p) {

                            // Compare each point to current point
                            angular.forEach(points, function(q) {
                            //points.forEach(function(q) {

                                // Find distance between two points
                                var xd = p.pos.x - q.pos.x;
                                var yd = p.pos.y - q.pos.y;
                                var dist = Math.sqrt( xd*xd + yd*yd );

                                // If under threshold, draw connecting line
                                if ( dist < distance ) {

                                    // Line intensity based on proximity
                                    var alpha = 1 - dist / distance;

                                    // Draw shadow
                                    ctx.strokeStyle = "rgba(0,0,0," + ( alpha * 0.2 ) + ")";
                                    ctx.beginPath();
                                    ctx.moveTo( p.pos.x, p.pos.y * 1.2 );
                                    ctx.lineTo( q.pos.x, q.pos.y * 1.2 );
                                    ctx.stroke();

                                    // Draw string
                                    ctx.strokeStyle = "rgba(%r,%g,%b,%a)".replace(/%([a-z])/g, function( m, v ) {
                                        return v === "a" ? alpha : p.setColor[ v ] ;
                                    });
                                    ctx.beginPath();
                                    ctx.moveTo( p.pos.x, p.pos.y );
                                    ctx.lineTo( q.pos.x, q.pos.y );
                                    ctx.stroke();

                                }

                            });

                            // Update location of point for next frame
                            p.pos.update();

                        });

                        // queue up the next frame
                        animate(tick);

                        // meter ticker
                        // meter.tick();

                    })();

                }; // .tick


                // Points array
                var points = [];

                var init = function() {
                    //console.log('CANVAS starting');

                    if (active) {
                        // lower points on mobiles (TODO: maybe increase based on devices?)
                        if($window.isMobile.any()) {
                            count = 10;
                        }

                        // Build points
                        while (count--) {
                            points.push(new Point());
                        }

                        // Fire it up bro!
                        animator(points, AnimateService);

                        scope.$on('fx.stringz:showCanvas', function () {
                            // console.log('showCanvas event trigger bro!!!!');

                            $timeout(function() {
                                $element.addClass("animated fadeIn");
                            }, 100);
                            //console.log("show canvas @ " , $element);
                        });

                        // ... also bind to window resize event
                        angular.element($window).bind('resize', function() {
                            // console.log('resize baby!');
                            scope.onResize();
                        });
                    }

                };

                init();

            };

            // Return directive config
            return {
                restrict: "E",
                templateUrl: tpl,
                link: link
            };

        }
    ]);


    //
    //  Experimental: 3d tilter
    //
    appDirectives.directive("3dTilter", function($rootScope, $timeout, $M) {
        // Link to DOM
        var link = function(scope, element, attrs) {

            element.addClass("tilter3D");

            //ßconsole.log('3d tilter on!');

            // click event
            /*element.on("click", function() {
                console.log("tilter click");
            });*/

            // mouse move / tilt
            element.on("mousemove", function(e) {
                //console.log('3d tilter move!');

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