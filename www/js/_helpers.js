//
// Helpers
//

// RAF polyfill
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function ( callback ) {
            window.setTimeout( callback, 16.6 ); // up to 60 FPS (1000/60)
        };
})();

// Is mobile checks
var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/mobile|Mobile/i);
  	},
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/BB10; Touch/);
  	},
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/webOS/i) ;
  	},
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    //return isMobile.any();
};