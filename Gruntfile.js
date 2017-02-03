'use strict';

module.exports = (grunt) => {

    /**
     * @constant
     * @type {object}
     */
    const PATHS = {
        scripts: {
            src:    'src/js/**/**/*',
            dist:   'dist/js/app.min.js'
        },
        styles: {
            src:    'src/styles/App.styl',
            dist:   'dist/css/app.min.css'
        }
    };

    /**
     * @type {object}
     */
    let cfg = {

        clean: {
            dist: 'dist/**/*'
        },

        stylus: {
            dist: {
                options: {
                    'include css': true,
                    use: [
                        () => require('autoprefixer-stylus')('last 2 versions')
                    ]
                },
                files: {
                   [PATHS.styles.dist]: PATHS.styles.src
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    [PATHS.scripts.dist]: PATHS.scripts.src
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: ['minifyify'],
                    transform: [
                        ['babelify', { presets: ['es2015'], plugins: ['transform-class-properties'] }]
                    ]
                }
            }
        },

        watch: {
            options: {
                livereloader: true
            },
            styles: {
                files: './src/styles/**/*', tasks: ['stylus']
            },
            scripts: {
                files: PATHS.scripts.src, tasks: ['browserify']
            },
            builder: {
                files: 'Gruntfile.js', tasks: ['build']
            }
        }
    };

    require('load-grunt-tasks')(grunt);

    grunt.initConfig(cfg);
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['clean', 'stylus', 'browserify']);
};