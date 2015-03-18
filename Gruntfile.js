module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      options: {
        config: '_config.yml,_config.build.yml',
        src: 'app'
      },
      dist: {
        options: {
          dest: 'dist',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      }
    },

    compass: {
      options: {
        // If you're using global Sass gems, require them here.
        // require: ['singularity', 'jacket'],
        sassDir: 'app/_sass',
        cssDir: '.tmp/css',
        imagesDir: 'app/img',
        javascriptsDir: 'app/js',
        relativeAssets: false,
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/generated',
        outputStyle: 'expanded',
        raw: 'extensions_dir = "app/_bower_components"\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'dist/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          generatedImagesDir: '.tmp/img/generated'
        }
      }
    },

    sass: { // sass tasks
      dist: {
        options: {
          compass: true, // enable the combass lib, more on this later
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'css/main.css': '_sass/main.scss' // this is our main scss file
        }
      }
    },

    cssmin: { // minifying css task
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },

    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin

    useminPrepare: {
      options: {
        dest: 'dist'
      },
      html: 'dist/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['dist', 'dist/img']
      },
      html: ['dist/**/*.html'],
      css: ['dist/css/**/*.css']
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.html',
          dest: 'dist'
        }]
      }
    },

    filerev: {
      options: {
        length: 8
      },
      dist: {
        files: [{
          src: [
            'dist/js/**/*.js',
            'dist/css/**/*.css',
            'dist/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            'dist/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            'img/**/*',
            'fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here.
            // '_bower_components/jquery/jquery.min.js',
            'favicon.ico',
            'apple-touch*.png'
          ],
          dest: 'dist'
        }]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      }
    },


    watch: { // watch task for general work
      compass: {
        files: ['app/_sass/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },
      // sass: {
      //   files: ['app/_sass/**/*.scss'],
      //   tasks: ['sass']
      // },
      styles: {
        files: ['css/til.css'],
        tasks: ['cssmin']
      },
      jekyll: {
        files: ['app/**/*.{html,yml,md,mkd,markdown}'],
        tasks: ['jekyll:server']
      }

    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            'app/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              'app'
            ]
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: 'dist'
          }
        }
      }
    },

    concurrent: {
      server: [
        'compass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin']);

  grunt.registerTask('build', [
    // 'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    // 'concat',
    // 'autoprefixer:dist',
    'cssmin',
    // 'uglify',
    // 'imagemin',
    // 'svgmin',
    'filerev',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      // 'clean:server',
      'concurrent:server',
     // 'autoprefixer:dist',
      'browserSync:server',
      'watch'
    ]);
  });

};
