'use strict';

const fs = require('fs');

const baseFileName = [
    'app'
];

let srcFile = [];
let distFile = [];
let distMinFile = [];

let htmlFile = [];

let pugFile = fs.readdirSync('./pugs');

pugFile.forEach((file) => {
    htmlFile.push(file.substr(0,file.length - 3) + 'html')
});

let files = {};

for(let i = 0; i < pugFile.length; ++i)
    files['./public/template/' + htmlFile[i]] = './pugs/' + pugFile[i];

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
                files: files
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