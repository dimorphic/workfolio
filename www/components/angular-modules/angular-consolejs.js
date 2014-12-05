(function(angular, Console){
  "use strict";

    //
    // Service
    //
    var Console = angular.module('Console', []);

    //
    //  Better console provider
    //  (via Console.js)
    //
    Console.factory('Console', ['$window',
        function($window) {
            // Better console
            var betterConsole = $window.Console;

            betterConsole.attach();
            betterConsole.styles.attach();

            // Pretty stylez!
            betterConsole.styles.register({
                bold: 'font-weight:bold',
                underline: 'text-decoration:underline',

                red: 'color:#f00',
                blue: 'color:#1795de',
                green: 'color:green',
                grey: 'color:grey',
                orange: 'color:#ffa500',

                heading: 'color: black; font-size: 32px; line-height: 32px;',
                code: 'background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1); line-height: 18px; text-decoration:underline;'
            });


            // Helper for log tracking (keep track of where events come from)
            var logCaller = function(moduleName) {
                if(!moduleName) { return; }

                moduleName = moduleName.split(':');

                var logPrettyName = '[' + moduleName[0].red + ':' + moduleName[1] + '] ';

                return logPrettyName;
            };

            
            // add shorthand reference to format method
            $window.$logger = betterConsole.styles.format;

            // expose log module name helper
            $window.logCaller = logCaller;

            return betterConsole; // assumes Console.js has already been loaded on the page
        }
    ]);

// end
})(angular, Console);