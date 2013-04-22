module.exports = function(grunt) {

    var DIR_CSS   = './assets/stylesheets/',
        DIR_JS    = './assets/javascripts/';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: DIR_CSS + 'src/',
                    cssDir : DIR_CSS + 'compiled/'
                }
            }
        },

        cssmin: {
            compress: {
                files: {
                    './assets/build/style-min.css': [DIR_CSS + 'compiled/style.css']
                }
            }
        },

        uglify: {
            compress: {
                files: {
                    './assets/build/index-min.js'              : [DIR_JS + 'index.js'],
                    './assets/build/demo/base-min.js'          : [DIR_JS + 'base.js'],
                    './assets/build/demo/list-min.js'          : [DIR_JS + 'list.js'],
                    './assets/build/demo/code-min.js'          : [DIR_JS + 'code.js'],
                    './assets/build/demo/module-min.js'        : [DIR_JS + 'module.js'],
                    './assets/build/demo/method-min.js'        : [DIR_JS + 'method.js'],
                    './assets/build/demo/config-min.js'        : [DIR_JS + 'config.js'],
                    './assets/build/demo/api/core-min.js'      : [DIR_JS + 'api/core.js'],
                    './assets/build/demo/api/components-min.js': [DIR_JS + 'api/components.js'],
                }
            }
        },

        watch: {
            compass: {
                files: [DIR_CSS + 'src/*.sass'],
                tasks: ['compass', 'cssmin']
            },
            js: {
                files: [DIR_JS + '*.js'],
                tasks: ['uglify']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compass', 'cssmin', 'uglify']);

};