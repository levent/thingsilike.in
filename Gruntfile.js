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
          generatedImagesDir: '<%= yeoman.dist %>/img/generated'
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



    copy: {
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
    },

    concurrent: {
      server: [
        'compass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        // 'compass:dist',
        // 'copy:dist'
      ]
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin']);

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      // 'clean:server',
      'concurrent:server',
     // 'autoprefixer:dist',
      'browserSync:server',
      'watch'
    ]);
  });

};
