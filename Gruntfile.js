/*

  Live Code Playground

*/

var path, lrSnippet,
    mountFolder, LIVERELOAD_PORT;

LIVERELOAD_PORT = 35729;

path = require('path');
lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
// lrSnippet = require('grunt-contrib-watch/lib').livereloadSnippet,

mountFolder = function( connect, dir ) {
  return connect.static(path.resolve(dir));
};

module.exports = function(grunt) {
  'use strict';

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // DEPENDENT PLUGINS =========================/

  // These plugins provide necessary tasks
  grunt.loadNpmTasks("grunt-extend-config");
  grunt.loadNpmTasks("grunt-notify");
  grunt.loadNpmTasks("grunt-open");

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-usemin");

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Or fast load all grunt tasks
  // require('load-grunt-tasks')(grunt);

  // App file paths
  var projectConfig = {
    app: ['app'],
    www: ['www'],
    dist: ['dist']
  };

  var src = {
    js: ['app/**/*.js'],
    templates: ['app/partials/**/*.html']
  };

  // Project config
  grunt.initConfig({
    project: projectConfig,

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed under the <%= pkg.license %> License */\n',

    // CONFIG ===================================/

    // Before generating any new files, remove any previously-created files.
    clean: {
      dist: [ 'dist/', '.temp/' ]
    },

    // js code inspection
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      // all: [
      //   'Gruntfile.js',
      //   '<%= project.app %>/{,*/}*.js'
      // ],
      all: [
        'Gruntfile.js',
        '<%= project.app %>/{,*/}*.js',
        '<%= project.www %>/js/{,*/}*.js',
        '!dist/**'
      ]
    },

    // Concat models
    concat: {
      models: {
        src: 'app/models/*.js',
        dest: 'dist/models/models.bundle.js'
      },
      controllers: {
          src: 'app/controllers/*.js',
          dest: 'dist/controllers/controllers.bundle.js'
      }
    },

    // Usemin (NEW)
    // TODO: finish
    useminPrepare: {
        html: 'dist/index.html',
        options: {
            root: 'dist',
            dest: 'dist'
        }
    },

    usemin: {
        html: 'dist/index.html'
    },


    // sass pre-processor
    // TODO: clean this up

    // compass: {
    //   options: {
    //     sassDir: 'app/scss',
    //     cssDir: 'www/css',
    //     imagesDir: 'www/img',
    //     fontsDir: 'app/scss/fonts',
    //     httpImagesPath: '/img',
    //     relativeAssets: false,
    //     debugInfo: false
    //   },
    //   dist: {}
    // },

    // watch files
    watch: {
      options: {
        spawn: false,
        livereload: true // Set livereload to trigger a reload upon change
      },

      // config files
      configFiles: {
        options: {
          spawn: true,
          reload: true
        },
        files: [
          'Gruntfile.js',
          'tasks/**/*.js',
          'test/**/*.js',
          'config/*.js'
        ],
        tasks: [ 'jshint', 'notify:gruntReloaded' ]
      },

      // sass
      css: {
        files: [ 'app/scss/{,**/}*.{scss,sass}' ],
        tasks: [ 'katalyst-compile-sass', 'copy:css' ],
        options: {
          spawn: false,
          livereload: true // Set livereload to trigger a reload upon change
        }
      },

      // js
      js: {
        files: [ 'app/**/*.js', 'www/**/*.js' ],
        tasks: [ 'jshint', 'copy:js_from_app', 'concat:models', 'concat:controllers' ],
        options: {
          spawn: false,
          livereload: true
        }
      },

      // html
//      html: {
//         files: [
//           'www/index.html'
//         ],
//         tasks: [ 'katalyst-compress', 'notify:katalystCompress' ],
//         options: {
//           livereload: true // Set livereload to trigger a reload upon change
//         }
//      },

      // all
      all: {
        files: [
          //'www/**/*'
          'www/**/{,*/}*.{html,css,js,png,jpg,gif,svg}'
          //'www/{,*/}*.html'
          //'www/{,*/}*.{css,js,png,jpg,gif,svg}'
        ],
        tasks: [ 'copy:www', 'notify:copywww' ],
        options: {
          spawn: false,
          livereload: true // Set livereload to trigger a reload upon change
        }
      },

      // livereload
      livereload: {
        files: [
          'dist/{,*/}*.html',
          'dist/{,*/}*.{css,js,png,jpg,gif,svg}'
        ],
        tasks: [ 'notify:livereload' ],
        options: {
          spawn: false,
          livereload: true
        }
      }

      // misc
      // livereload: {
      //   files: ['www/**/*'],
      //   options: {
      //     livereload: true
      //   }
      // }

    },

    // static web server
    connect: {
      options: {
        hostname: '0.0.0.0', // access the server from outside.
        port: 4000
      },

      // normal way
      dev: {
        options: {
          base: 'dist',
          keepalive: false
        }
      },

      // middleware man + livereload
      livereload: {
        options: {
          middleware: function( connect ) {
            return [
              lrSnippet,
              mountFolder(connect, './dist')
            ];
          }
        }
      }

    },

    // open your browser at the project's URL
    open: {
      dev: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    }

  });

  // Extend config test
  grunt.extendConfig({

    //
    // Copy
    //
    copy: {

      // Html
      html: {
        expand: true,
        cwd: 'www/',
        src: [ '**/*.html' ],
        dest: 'dist/'
      },

      // Copy CSS from www/ to dist/
      css: {
        expand: true,
        cwd: 'www/css',
        src: [ '**/*.css' ],
        dest: 'dist/css'
      },

      // Copy JS from app/ to dist/
      js_from_app: {
        expand: true,
        cwd: 'app/',
        src: [ '**/*.js' ],
        dest: 'dist/'
      },

      // Copy files from www/ to dist/ (except for .scss)
      www: {
        expand: true,
        cwd: 'www/',
        src: [ '**/*.*', '!**/*.scss' ],
        dest: 'dist/'
      }

    },

    //
    // Notify test messages
    //
    notify: {
      server: {
        options: {
          message: 'Server is up!'
        }
      },

      gruntReloaded: {
        options: {
          title: 'Grunt config update',
          message: 'Reload complete'
        }
      },

      copywww: {
        options: {
          title: 'WWW updated',
          message: 'Creating dist/'
        }
      },

      katalystCompress: {
        options: {
            title: 'index.html updated',
            message: 'Compressing to /dist'
        }
      },

      livereload: {
        options: {
          title: 'Live reload active',
          message: 'Serving /dist'
        }
      }
    }
  });


  // TASKS =====================================/

  // Load all tasks from folder
  // grunt.loadTasks('tasks');

  // sass compiler
  grunt.registerTask("katalyst-compile-sass", "Compile SASS if they exist", function() {

      var sassFiles;
      // Extend config test
      grunt.extendConfig({
        // sass: {
        //   dist: {
        //     files: [
        //       {
        //         expand: true,
        //         cwd: 'app/',
        //         src: ['**/!(_*).scss', '**/!(_*).sass'],
        //         dest: 'dist/',
        //         ext: '.css'
        //       }, {
        //         expand: true,
        //         cwd: 'www/',
        //         src: ['**/!(_*).scss', '**/!(_*).sass'],
        //         dest: 'dist/',
        //         ext: '.css'
        //       }
        //     ]
        //   }
        // }


        compass: {
          options: {
            sassDir: 'app/scss',
            cssDir: 'www/css',
            imagesDir: 'www/img',
            fontsDir: 'app/scss/fonts',
            httpImagesPath: '/img',
            relativeAssets: false,
            debugInfo: false
          },
          dist: {}
        }

      });

      sassFiles = grunt.file.expand(["www/**/*.scss", "www/**/*.sass", "app/**/*.scss", "app/**/*.sass"]);
      if (sassFiles.length > 0) {
        grunt.log.writeln("SASS files found, compiling to dist/ ...");
        return grunt.task.run("compass");
      } else {
        return grunt.log.writeln("No .scss or .sass files found in app/ or www/, skipping SASS compile.");
      }

  });

  // compressor
  grunt.registerTask("katalyst-compress", "Concat, minify, uglify + references update", [

      'useminPrepare',
      'concat:generated',
      //'cssmin',
      'uglify:generated',
      'usemin'

  ]);



  // Server task
  grunt.registerTask('server', [
    'clean',

    'jshint',
    'katalyst-compile-sass',

    'copy:js_from_app',
    'copy:www',

    'concat:models',
    'concat:controllers',

    'connect:livereload',
    //'open:dev',
    'notify:server',
    'watch'
  ]);

  // Build task (to do)
  grunt.registerTask('build', [
    'katalyst-compress'
  ]);



  // Default task
  grunt.registerTask('default', [ 'server' ]);



};
