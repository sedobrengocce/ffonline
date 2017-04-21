'use strict';
function gruntFunction(grunt) {
    grunt.initConfig({
        browserify: {
            development: {
                src: './src/app.js',
                dest: './public/js/app.js',
                options: {
                    browserifyOptions: {debug: true},
                    transform: [["babelify", {"presets": ["es2015"]}]],
                    watch: true,
                    keepalive: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['browserify']);
}

module.exports = gruntFunction;