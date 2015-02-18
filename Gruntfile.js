module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {
      dist: {
        options: {
          removeComments:true
        },
        files: {
          'index.html': 'index.html',
        }
      }
    },
    compass: {
      dist: {
        options: {
          raw: 'require "bootstrap-sass"\n require "compass/import-once/activate"\n',
          sassDir:'sass',
          cssDir:'css',
          httpPath:'/',
          imagesDir:'img',
          javascriptsDir:'js',
          //outputStyle:'compressed'
          outputStyle:'expanded'
        }
      }
    },
    uglify: {
      options: {
        mangle:true,
        compress:true
      },
      build: {
        src:['js/*.js', '!js/*.min.js'],
        dest:'js/main.min.js'
      }
    },
    watch: {
      scripts: {
        files:['js/*.js', '!js/*min.js'],
        tasks:['uglify'],
        options: {
          spawn:false,
          livereload:true
        },
      },
      css: {
        files:['sass/*.scss'],
        tasks:['compass'],
        options: {
          spawn:false,
          livereload:true
        }
      },
      html: {
        files:['*.html'],
        tasks:['htmlmin'],
        options: {
          spawn:false,
          livereload:true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['compass', 'uglify', 'htmlmin']);
};
