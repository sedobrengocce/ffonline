'use strict';

const baseFileName = [
    'app',
    'app.route',
    'shared/controller/adminLoginCtrl'
];

let srcFile = [];
let distFile = [];
let distMinFile = [];

let pugFile = [];
let htmlFile = [];

baseFileName.forEach((name) => {
    srcFile.push('./src/' + name + '.js');
    distFile.push('./public/js/' + name + '.js');
    distMinFile.push('./public/js/' + name + '.min.js');
});

function gruntFunction(grunt) {
    grunt.initConfig({
        pug: {
            compile:{
                options: {
                    pretty: true
                },
                files: {
                    "./public/template/adminlogin.html": "./pugs/adminlogin.pug",
                    "./public/template/adminmain.html": "./pugs/adminmain.pug"
                }
            }
        },
        browserify: {
            development: {
                src: srcFile,
                dest: './public/js/common.js',
                options: {
                    browserifyOptions: {debug: true},
                    transform: [["babelify", {"presets": ["es2015"]}]],
                    plugin: [
                        ["factor-bundle", {
                            outputs: distFile,
                        }]
                    ]
                },
                watch: true,
                keepAlive: true
            },
            production: {
                src: srcFile,
                dest: './public/js/common.min.js',
                options: {
                    browserifyOptions: {debug: false},
                    transform: [["babelify", {"presets": ["es2015"]}]],
                    plugin: [
                        ["factor-bundle", {
                            outputs: distMinFile
                        }],
                        ["minifyify", {map: false}]
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.registerTask('default', ['pug', 'browserify']);
}

module.exports = gruntFunction;