module.exports = function(grunt) {

  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

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
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/js/**/*.js',
        'test/spec/**/*.js'
      ]
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          'app/css/**/*.css'
        ]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        expand: true,
        cwd: '.tmp',
        src: '**/{css,concat}/*.css',
        dest: '.tmp'
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!dist/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },

    compass: {
      options: {
        // If you're using global Sass gems, require them here.
        // require: ['singularity', 'jacket'],
        sassDir: 'app/_sass',
        cssDir: '.tmp/css',
        imagesDir: 'app/img',
        // javascriptsDir: 'app/js',
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

    cssmin: { // minifying css task
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.{jpg,jpeg,png}',
          dest: 'dist'
        }]
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

    watch: {
      compass: {
        files: ['app/_sass/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:dist']
      },
      autoprefixer: {
        files: ['app/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:dist']
      },
      jekyll: {
        files: [
          'app/**/*.{html,yml,md,mkd,markdown}',
          '!app/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,app}/js/**/*.js',
            'app/_bower_components/**/*.js',
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

    buildcontrol: {
      dist: {
        options: {
          remote: 'git@github.com:levent/thingsilike.in.git',
          branch: 'gh-pages-staging',
          commit: true,
          push: true
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


  // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin']);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'compass:server',
    'jshint:all',
    'csslint:check'
    // 'scsslint'
    ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'cssmin',
    // 'uglify',
    'imagemin',
    // 'svgmin',
    'filerev',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('test', function() {
    console.log("This is javascript, why would I test?");
  });

  grunt.registerTask('deploy', [
    'check',
    'test',
    'build',
    'buildcontrol'
    ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer:dist',
      'browserSync:server',
      'watch'
    ]);
  });

};
