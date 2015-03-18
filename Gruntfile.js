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

    sass: { // sass tasks
      dist: {
        options: {
          compass: false, // enable the combass lib, more on this later
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'css/til.css': '_sass/main.scss' // this is our main scss file
        }
      }
    },

    cssmin: { // minifying css task
      dist: {
        files: {
          'css/til.min.css': 'css/til.css'
        }
      }
    },


    watch: { // watch task for general work
      sass: {
        files: ['app/_sass/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['css/til.css'],
        tasks: ['cssmin']
      },
      jekyll: {
        files: ['app/**/*.{html,yml,md,mkd,markdown}'],
        tasks: ['jekyll:server']
      }

    },
    concurrent: {
      server: [
        // 'compass:server',
        // 'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        // 'compass:dist',
        // 'copy:dist'
      ]
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
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
