(function(angular){
  "use strict";

    //
    // Directives
    //
	var appDirectives = angular.module('workfolio.directives', []);

    // No scroll
    appDirectives.directive("noScroll",
        ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            var first = true;

            // Link to DOM
            var link = function(scope, element) {
                // add no-scroll class
                element.addClass("noscroll");

                // wait for trigger
                scope.$on("noScroll:disable", function(data){
                    element.removeClass("noscroll");
                    first = false;
                });

                // wait for trigger
                scope.$on("noScroll:enable", function(data){
                    element.addClass("noscroll");
                });
            };

            // Return directive config
            return {
                restrict: "A",
                link: link
            };
        }
    ]);

    //
    // App Logo
    //
    appDirectives.directive("appLogo",
        ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            var tpl = 'templates/directives/app-logo.tpl.html';

            // rgb to hex
            var rgbToHex = function(color) {
                if(color.substr(0, 1) === "#") { return color; }

                var digits = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

                return (digits && digits.length === 4) ? "#" +
                        ("0" + parseInt(digits[1], 10).toString(16)).slice(-2) + // red
                        ("0" + parseInt(digits[2], 10).toString(16)).slice(-2) + // green
                        ("0" + parseInt(digits[3], 10).toString(16)).slice(-2) : ''; // blue or nada
            };

            // Link to DOM
            var link = function(scope, element, attrs) {

                var _timings = [0, 200, 400, 600, 800, 1000, 1200];
                var _drawDelay = 200; // ms

                // fetch elements
                var $paths = element.find('path');
                var $circle = $(".st5");
                var $crown = $(".st12");

                //
                // Draw butterfly helper
                // TODO: finish logo stroke self-draw ?
                var drawButterfly = function() {

                    // butterfly paths
                    $paths.each(function (item) {

                        var $path, pathLen, pathRect;

                        $path = $(this);
                        pathLen = this.getTotalLength();

                        var color = rgbToHex($path.css("fill"));

                        /*
                        OLD METHOD

                        $path.css({
                            "stroke-dasharray": pathLen,
                            "stroke-dashoffset": pathLen,
                            "stroke-width": "5",
                            "stroke": $path.css("fill"),
                            "fill": "transparent"
                        });

                        pathRect = this.getBoundingClientRect();

                        $path.css({
                            "transition": "stroke-dashoffset 3s ease " + _timings[i] + "ms, fill 1s ease-in " +
                                (1500 + _timings[i]) + "ms, stroke-width 1s ease " + (4500 + _timings[i]),
                            "fill": $path.css("stroke"),
                            "stroke-dashoffset": "0"
                        });
                         */

                        var transitionDelay = item * _drawDelay;
                        var transition = "stroke-dashoffset 3s ease " + transitionDelay + "ms, " +
                                         "fill 1s ease-in " + (1500 + transitionDelay) + "ms";

                        $path.css({
                            "stroke-dasharray": pathLen,
                            "stroke-dashoffset": pathLen,
                            "stroke-width": 5,

                            "stroke": color,
                            "fill": "transparent"
                        });

                        pathRect = this.getBoundingClientRect();

                        $path.css({ "transition": transition });

                        $path.velocity(
                            { fill: color, strokeDashoffset: 0 },
                            { queue: false }
                        );

                    });

                };

                //
                // Draw extra artefacts (circle + crown)
                //
                var drawExtra = function() {
                    /*var transition = "stroke-dasharray 0.7s ease";
                    //var circlePath = parseInt($circle[0].getTotalLength());

                    $circle.css({
                        "transition": transition
                        //"stroke-dasharray": circlePath,
                        //"stroke-dashoffset": circlePath
                    });*/

                    // circle
                    $timeout(function() {

                        $circle.velocity(
                            {
                                stroke: "#fff",
                                strokeDasharray: 0,
                                //strokeDashoffset: 0
                            },
                            { queue: false, duration: 400 }
                        );

                    }, 300);

                    // crown
                    $crown.css({ "fill": "#fff" });
                };

                // Fire it up!
                drawButterfly();

                // circle anim
                $timeout(function() {

                    drawExtra();

                    // broadcast event to show fx.Stringz
                    $rootScope.$emit("fx.stringz:showCanvas");

                }, 3000);

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
    appDirectives.directive("loadIcon",
        ['$timeout',
        function($timeout) {
            var tpl = 'templates/directives/load-icon.tpl.html';

            // Link to DOM
            var link = function(scope, element, attrs) { };

            // Return directive config
            return {
                restrict: "E",
                templateUrl: tpl,
                link: link
            };
        }
    ]);

    //
    // Hi there!
    //
    appDirectives.directive("hiThere",
        ['$timeout', '$interval', '_',
            function($timeout, $interval, _) {

                // messages
                var loadMoreMsg = "Scroll down, bro!";

                var greetMessages = [
                    'Sabin Tudor',
                    'There is no spoon!',
                    'contact@sabin-tudor.ro'
                ];

                // Link to DOM
                var link = function(scope, element, attrs) {

                    // message model
                    scope.hiMsg = "";

                    // pointer
                    var $container = angular.element(element);
                    var shuffleInterval = 10000; // delay to shuffle msg

                    // fetch random message
                    $interval(function() {

                        // get a sample message
                        var msg = _.sample(greetMessages, 1)[0];

                        // check if there's more items for infinite scroller
                        if(!scope.infiniteDisabled && scope.hiMsg !== loadMoreMsg) {
                            msg = loadMoreMsg;
                        }

                        if(msg !== scope.hiMsg) {

                            // shuffle letterz bro!
                            $timeout(function() {
                                scope.hiMsg = msg;

                                $container.shuffleLetters({
                                    text: scope.hiMsg
                                });
                            });

                        }

                    }, shuffleInterval);

                    // DEBUG: watch model change
                    /* scope.$watch("hiMsg", function(newValue, oldValue) {
                            console.log('old @ ', oldValue);
                            console.log('new @ ', newValue);
                            console.log('new vs old @ ', (newValue !== oldValue));
                            console.log(' ');

                    }); */

                };

                // Return directive config
                return {
                    restrict: "A",
                    link: link
                };
            }
        ]);

    //
    // Grid
    //

    // grid item
    appDirectives.directive("gridItem",
        ['$timeout', '$rootScope', '_', 'Modernizr',
        function($timeout, $rootScope, _, Modernizr) {
            var tpl = 'templates/directives/grid.item.tpl.html';

            // Animate each box
            var fadeDirections = [ "Up", "Down", "Left", "Right" ];

            // Link to DOM
            var link = function(scope, element, attrs) {
                // do nothing if no model
                if(!scope.project) { return; }

                // continue, do stuffz!
                var $item = element.find(".grid-item");
                var $thumb = element.find(".thumb");
                var $img = $thumb.find("img");

                // image src
                var src = scope.project.thumbUrl;
                //var delay = element.index() * 0.1 + 's';

                // open lightbox
                var handleClick = function (e) {
                    e.preventDefault();

                    var $projectData = {
                        url: scope.project.imageUrl,
                        caption: scope.project.name + ' / ' + scope.project.description + ' / ' + scope.project.client + ' / ' + scope.project.year
                    };

                    $timeout(function() {
                        scope.$emit("fxProjector:open");
                    });

                };

                // check if mobile
                // TODO: fix this. touchstart fires on document scroll
                var clickGesture = (Modernizr.touch) ? "click" : "click";

                // bind once
                $img.one("load", function() {

                    $timeout(function() {
                        //console.log("running fx @ ", src);

                        // set background image
                        $thumb.css("background-image", 'url(' + src + ')');

                        // fade item in
                        var fxClass = _.sample(fadeDirections, 1);
                        $thumb.addClass("animated fadeIn" + fxClass);

                        // set item to 'loaded' state
                        $item.addClass("loaded");

                        // add click event
                        element.on(clickGesture, handleClick);

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
        }
    ]);

    //
    //  Lightbox directive (Strip)
    //
    /*appDirectives.directive("lightBox",
        ['$timeout', 'Strip',
        function($timeout, Strip) {
            //var tpl = 'templates/partials/lightbox.tpl.html';

            var $boxOptions = {
                side: 'right'
            };

            // DOM link
            var link = function(scope, element, attrs) {

                // catch image
                var $img = element.find("img");

                // bind once
                $img.one("load", function() {

                    //var $project = {
                    //    href: scope.project.thumbUrl,
                    //    title: scope.project.name
                    //};

                    var $project = {
                        url: scope.project.imageUrl,
                        caption: scope.project.name + ' / ' + scope.project.description + ' / ' + scope.project.client + ' / ' + scope.project.year
                    };

                    // wait for event to open light box
                    scope.$on('lightBox:open', function(data) {
                        // strip implementation
                        Strip.show($project, $boxOptions);

                        // fancybox implementation
                        //$.fancybox($project, { padding: 0, openEffect: 'elastic' });
                    });

                });

            };

            // Return directive config
            return {
                restrict: "A",
                link: link
            };
        }
    ]);
*/

    //
    //  fxProjector
    //  Display project details in style
    //
    appDirectives.directive("fxProjector",
        ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            var tpl = 'templates/directives/fx-projector.tpl.html';

            // DOM link
            var link = function(scope, element, attrs) {
                var $active = false;

                scope.project = [];

                var _openProjector = function(data) {
                    $active = true;

                    // assign project details
                    scope.project = data;

                    // disable body scroll
                    $rootScope.$broadcast("noScroll:enable");
                    element.addClass("active");

                    var $text = angular.element(element).find("h1");

                    // shuffle letterz bro!
                    $text.shuffleLetters({
                        text: scope.project.name
                    });

                    // catch image
                    var img = new Image();
                    img.classList.add("img-responsive");
                    img.classList.add("animated");

                    var $img = $(img);

                    // one load
                    $img.one('load', function() {
                        element.find(".fx-preview").addClass("loaded");
                    });

                    // set src, trigger load event
                    img.src = scope.project.imageUrl;

                    // append
                    element.find(".fx-preview").append($img);
                };

                var _closeProjector = function() {

                    if ($active) {

                        // remove active class
                        element.removeClass("active");
                        element.find(".fx-preview").removeClass("loaded");

                        // enable body scroll
                        $rootScope.$broadcast("noScroll:disable");

                        // catch image
                        var $img = element.find("img");
                        $img.remove();

                        $active = false;
                    }

                };

                // close button
                scope.closeProjector = function() {
                    //console.log("closing projector...");
                    _closeProjector();
                };

                // wait for event to open light box
                scope.$on('fxProjector:open', function(data) {
                    //console.log("fxProjector data: ", data);
                    // we haz dataz ?
                    if(!data.targetScope.project) { return; }

                    _openProjector(data.targetScope.project);
                });

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
    //  Experimental: fxStringz
    //
    appDirectives.directive("fxStringz",
        ['$rootScope', '$window', '$timeout', '_', 'AnimateService',
        function($rootScope, $window, $timeout, _, AnimateService) {

            // template
            var tpl = 'templates/directives/fx-stringz.tpl.html';
            //var tpl = '<canvas> </canvas>';

            // DOM link
            var link = function(scope, element, attrs) {

                // you mobile, bro ?
                var mobileDevice = $window.isMobile.any();

                // we active ?
                var active = (mobileDevice) ? false : true;
                var showFPS = false;

                // FPS monitor (enable via uncomment)
                var meter, FPSMeter = $window.FPSMeter || null;

                if (active && showFPS && FPSMeter) {
                    meter = new FPSMeter({
                        theme: 'dark',
                        heat: 1,

                        graph: 1,
                        history: 10,

                        left: 'auto',
                        right: 0
                    });
                }

                // Canvas
                var canvas = element.find("canvas")[0];
                var ctx = canvas.getContext("2d");
                var W, H = null;

                // Config
                var distance = 100; // connect threshold
                var padding = (mobileDevice) ? 10 : 20;

                // points number (TODO: maybe increase based on devices?)
                var count = (mobileDevice) ? 20 : 100;

                // Resize handler
                var resizeHandler = function() {
                    W = canvas.width = window.innerWidth;
                    H = canvas.height = window.innerHeight;

                    // console.log("on resize trigger bro!");
                };
                resizeHandler(); // ... and actually call it

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

                // points color replacer
                var generateColor = function(p, str, alpha) {
                    str = "rgba(%r,%g,%b,%a)".replace(/%([a-z])/g, function( m, v ) {
                        return v === "a" ? alpha : p.setColor[ v ] ;
                    });

                    return str;
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
                        // ctx.fillRect( 0, 0, W, H );

                        // Draw our strings
                        ctx.lineWidth = 1;

                        // Cycle over every point
                        //_.each(points, function(p) {
                        var i, k, pointsNo = points.length;

                        for (i = 0; i < pointsNo; i++) {
                            var p = points[i];

                            // Compare each point to current point
                            //_.each(points, function(q) {
                            for (k = 0; k < pointsNo; k++) {
                                var q = points[k];

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
                                    ctx.strokeStyle = generateColor(p, ctx.strokeStyle, alpha);
                                    ctx.beginPath();
                                    ctx.moveTo( p.pos.x, p.pos.y );
                                    ctx.lineTo( q.pos.x, q.pos.y );
                                    ctx.stroke();
                                }

                            }

                            // Update location of point for next frame
                            p.pos.update();

                        }

                        // fps meter ticker
                        if (showFPS && FPSMeter) { meter.tick(); }

                        // queue up the next frame
                        animate(tick);

                    })();

                }; // .tick


                // Points array
                var points = [];

                var init = function() {
                    //console.log('CANVAS starting');

                    if (active) {

                        // Build points
                        while (count--) {
                            points.push(new Point());
                        }

                        // Fire it up bro!
                        animator(points, AnimateService);

                        // Attach events
                        scope.$on('fx.stringz:showCanvas', function () {

                            //$timeout(function() {
                                element.addClass("animated fadeIn");
                            //}, 200);

                        });

                        // ... also bind to window resize event
                        angular.element($window).bind('resize', function() {
                            resizeHandler();
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
    appDirectives.directive("3dTilter",
        ['$rootScope', '$timeout', '$M',
        function($rootScope, $timeout, $M) {
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
        }
    ]);


// end directives
})(angular);